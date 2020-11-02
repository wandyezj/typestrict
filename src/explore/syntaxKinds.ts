import ts from "typescript";
import { getSourceFileNode } from "../getSourceFileNode";
import { visitNodesAndCallback } from "../visitNodesAndCallback";

export function syntaxKinds(typescript: string): string[] {
    const kinds = new Set<ts.SyntaxKind>();
    const sourceFile = getSourceFileNode(typescript);
    visitNodesAndCallback(sourceFile, (node: ts.Node) => {
        const kind = node.kind;
        kinds.add(kind);
    });

    const kindArray: ts.SyntaxKind[] = [];
    kinds.forEach((kind) => {
        kindArray.push(kind);
    });

    return kindArray.map((kind) => ts.SyntaxKind[kind]);
}
