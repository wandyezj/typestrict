import * as ts from "typescript";

export function visitNodeAndPrint(node: ts.Node) {
    if (node) {
        console.log(ts.SyntaxKind[node.kind]);
        console.log(`node: ${node.getText()}`);
        ts.forEachChild(node, visitNodeAndPrint);
    }
}
