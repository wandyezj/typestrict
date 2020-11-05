import * as ts from "typescript";

export function createProgram(
    inputFileName: string,
    typescriptInput: string
): ts.Program {
    // outputs
    // let outputText: string | undefined;
    // let sourceMapText: string | undefined;

    // options
    const compilerOptions: ts.CompilerOptions = {
        target: ts.ScriptTarget.ES5,
        sourceMap: true,
    };

    // sourceFile and host
    // need to set parent nodes
    const sourceFile = ts.createSourceFile(
        inputFileName,
        typescriptInput,
        ts.ScriptTarget.ESNext,
        true
    );

    // fake compiler host
    const compilerHost: ts.CompilerHost = {
        getSourceFile: (fileName: string) => {
            //console.log(fileName);
            //.replace(/\\/g, "/")
            // lib.d.ts
            return fileName === inputFileName ? sourceFile : undefined;
        },
        writeFile: () => {},
        // (name, text) => {
        //     if (/\.map$/.test(name)) {
        //         sourceMapText = text;
        //     }
        //     else {
        //         outputText = text;
        //     }
        // },
        getDefaultLibFileName: () => "lib.d.ts",
        useCaseSensitiveFileNames: () => false,
        getCanonicalFileName: (fileName) => fileName,
        getCurrentDirectory: () => "",
        getNewLine: () => "\n",
        fileExists: (fileName): boolean => fileName === inputFileName,
        readFile: () => "",
        directoryExists: () => true,
        getDirectories: () => [],
    };

    // construct the program
    const program = ts.createProgram(
        [inputFileName],
        compilerOptions,
        compilerHost
    );

    return program;
}
