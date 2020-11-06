import * as ts from "typescript";
import { getSourceFileNode } from "./getSourceFileNode";
import { Rules } from "./rules/Rules";
import { visitNodesAndCallback } from "./visitNodesAndCallback";
import {Issue} from  "./Issue";

const syntaxKindDefault = [
    ts.SyntaxKind.SourceFile,
    ts.SyntaxKind.FirstStatement,
    ts.SyntaxKind.VariableDeclarationList,
    ts.SyntaxKind.VariableDeclaration,
    ts.SyntaxKind.Identifier,
    ts.SyntaxKind.FirstLiteralToken,
    ts.SyntaxKind.EndOfFileToken,
    ts.SyntaxKind.StringLiteral,
    ts.SyntaxKind.ForStatement,
    ts.SyntaxKind.BinaryExpression,
    ts.SyntaxKind.FirstBinaryOperator,
    ts.SyntaxKind.PostfixUnaryExpression,
    ts.SyntaxKind.Block,
    ts.SyntaxKind.WhileStatement,
    ts.SyntaxKind.TrueKeyword,
    ts.SyntaxKind.IfStatement,
    ts.SyntaxKind.FalseKeyword,
    ts.SyntaxKind.FunctionDeclaration,
    ts.SyntaxKind.ArrayLiteralExpression,
    ts.SyntaxKind.ForOfStatement,
    ts.SyntaxKind.ForInStatement,
    ts.SyntaxKind.ObjectLiteralExpression,
    ts.SyntaxKind.PropertyAssignment,
    ts.SyntaxKind.ArrowFunction,
    ts.SyntaxKind.Parameter,
    ts.SyntaxKind.NumberKeyword,
    ts.SyntaxKind.EqualsGreaterThanToken,
    ts.SyntaxKind.PlusToken,
    ts.SyntaxKind.ExpressionStatement,
    ts.SyntaxKind.CallExpression,
    ts.SyntaxKind.PropertyAccessExpression,
];

export interface CheckOptions {
        rules?: Partial<{
            syntaxKind: {};
            blockRequired: {};
            nameRegex:{};
            functionDeclaration:{};
        }>
}


export function getIssues(
    code: string,
    options: CheckOptions = {
        rules: {
            syntaxKind: {},
            blockRequired: {},
            nameRegex:{},
            functionDeclaration:{},
        }
    }
): Issue[] {
    // console.log(code);
    const rules = new Rules();

    const {
        syntaxKind,
        blockRequired,
        nameRegex,
        functionDeclaration
    } = options.rules || {};

    const enableSyntaxKind = syntaxKind !== undefined;
    if (enableSyntaxKind) {
        rules.addRuleSyntaxKind(syntaxKindDefault);
    }

    const enableBlockRequired = blockRequired !== undefined;
    if (enableBlockRequired) {
        // console.log("enableBlockRequired")
        rules.addRuleBlockRequired();
    }

    const enableNameRegex = nameRegex !== undefined;
    if (enableNameRegex) {
        // console.log("enableNameRegex")

        /*
        Function Names must:
            - be composed only ov upper and lower case ASCII letters
            - start with a lower case letter
            - end with a lower case letter
            - not have upper case letters next to each other
        */
        const functionName = /^[a-z]+([A-Z]{1}[a-z]+)*$/;
        const variableName = functionName;
        rules.addRuleNameRegex({
            functionName,
            variableName,
        });
    }

    const enableFunctionDeclaration = functionDeclaration !== undefined;
    if (enableFunctionDeclaration) {
        rules.addRuleFunctionDeclaration();
    }

    // if acting on a single source file then external symbols cannot be resolved
    const sourceFile = getSourceFileNode(code);

    visitNodesAndCallback(sourceFile, (node: ts.Node) => {
        rules.run(node);
    });

     // print all the messages
    // rules.errors.forEach((error) => {
    //     console.log(error);
    // });

    const issues = rules.results.map((result) => {
        const {code, message, node} = result;

        const {pos, end}= node;

        const open = sourceFile.getLineAndCharacterOfPosition(pos);
        const close = sourceFile.getLineAndCharacterOfPosition(end);

        const issue: Issue = {
            code: code || "?",
            message,
            pos,
            end,
            startLineNumber: open.line,
            endLineNumber: close.line,
            startColumn: open.character,
            endColumn: close.character,
        };

        return issue;
    });

    return issues;
}

export function checkTs(
    code: string,
    options: CheckOptions = {}
): boolean {


 
    const issues = getIssues(code, options);
    return issues.length === 0;
}



function test() {
const program = `
function f(){function f(){}}
`;
const pass = checkTs(program, {
    rules: {
        blockRequired: {},
        syntaxKind: {},
        nameRegex:{},
        functionDeclaration:{},
    },
});

console.log(pass);
}
test();