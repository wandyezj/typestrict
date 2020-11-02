import * as ts from "typescript";
import { getSourceFileNode } from "./getSourceFileNode";
import { Rules } from "./rules/Rules";
import { visitNodesAndCallback } from "./visitNodesAndCallback";

export function checkTs(typescript: string): boolean {
    const rules = new Rules();
    rules.addRuleSyntaxKind([
        ts.SyntaxKind.SourceFile,
        ts.SyntaxKind.FirstStatement,
        ts.SyntaxKind.VariableDeclarationList,
        ts.SyntaxKind.VariableDeclaration,
        ts.SyntaxKind.Identifier,
        ts.SyntaxKind.FirstLiteralToken,
        ts.SyntaxKind.EndOfFileToken,
    ]);

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

    // nodeOnlyContainsSupportedSyntaxKinds(sourceFile, new Set<ts.SyntaxKind>([
    //     ts.SyntaxKind.SourceFile,
    //     ts.SyntaxKind.FirstStatement,
    //     ts.SyntaxKind.VariableDeclarationList,
    //     ts.SyntaxKind.VariableDeclaration,
    //     ts.SyntaxKind.Identifier,
    //     ts.SyntaxKind.FirstLiteralToken,
    //     ts.SyntaxKind.EndOfFileToken,
    // ]));

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
