import * as ts from "typescript";

export function getSourceFileNode(typescript: string) {
    const inputFileName = "input.ts";

    // if acting on a single source file then external symbols cannot be resolved
    const sourceFile = ts.createSourceFile(
        inputFileName,
        typescript,
        ts.ScriptTarget.ESNext,
        true
    );

    return sourceFile;
}
