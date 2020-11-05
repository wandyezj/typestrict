import * as ts from "typescript";

export function visitNodesAndCallback(
    node: ts.Node | undefined,
    callback: (node: ts.Node) => void
) {
    function visitNode(node: ts.Node | undefined) {
        if (node) {
            callback(node);
            ts.forEachChild(node, visitNode);
        }
    }

    visitNode(node);
}
