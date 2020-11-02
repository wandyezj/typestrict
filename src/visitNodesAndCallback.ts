import * as ts from "typescript";

export function visitNodesAndCallback(
    node: ts.Node,
    callback: (node: ts.Node) => void
) {
    function visitNode(node: ts.Node) {
        if (node) {
            callback(node);
            ts.forEachChild(node, visitNode);
        }
    }
    visitNode(node);
}
