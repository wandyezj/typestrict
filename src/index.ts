import * as ts from "typescript";
import { getSourceFileNode } from "./getSourceFileNode";
import { Rules } from "./rules/Rules";
import { visitNodesAndCallback } from "./visitNodesAndCallback";

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

export function checkTs(
    typescript: string,
    options: {
        rules?: {
            syntaxKind?: {};
            blockRequired?: {};
        };
    } = {}
): boolean {

    const rules = new Rules();

    const enableSyntaxKind = options?.rules?.syntaxKind !== undefined;
    if (enableSyntaxKind) {
        rules.addRuleSyntaxKind(syntaxKindDefault);
    }

    const enableBlockRequired = options?.rules?.blockRequired !== undefined;
    if (enableBlockRequired) {
        rules.addRuleBlockRequired();
    }

    // if acting on a single source file then external symbols cannot be resolved
    const sourceFile = getSourceFileNode(typescript);

    visitNodesAndCallback(sourceFile, (node: ts.Node) => {
        rules.run(node);
    });

    // print all the messages
    rules.errors.forEach((error) => {
        console.log(error);
    });

    return rules.pass;

    // set of checks for a node, checks pass or fail.
    return false;
}

// interface Check {
//     check(node: ts.Node): void;

// }

// function nodeOnlyContainsSupportedSyntaxKinds(node: ts.Node, kinds: Set<ts.SyntaxKind>): boolean {

//     let allValid = true;

//     function visitNode(node:ts.Node) {
//         if (node) {
//             const isValid = kinds.has(node.kind);
//             allValid = allValid && isValid;
//             console.log(`[${isValid ? " " : "X"}] ${ts.SyntaxKind[node.kind]}`);
//             console.log(`node: ${node.getText()}`);

//             ts.forEachChild(node, visitNode);
//         }
//     }

//     visitNode(node);

//     return allValid;
// }

const program = `
const x = 0;
`;
checkTs(program);
