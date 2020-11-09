
import './index.css';
import {editor} from "./editor";
import * as ts from "typescript";

// @ts-ignore
self.MonacoEnvironment = {
	getWorkerUrl: function (moduleId, label) {
		if (label === 'json') {
			return './json.worker.bundle.js';
		}
		if (label === 'css') {
			return './css.worker.bundle.js';
		}
		if (label === 'html') {
			return './html.worker.bundle.js';
		}
		if (label === 'typescript' || label === 'javascript') {
			return './ts.worker.bundle.js';
		}
		return './editor.worker.bundle.js';
	}
};

document.getElementById("run").onclick = run;

function run() {
	const code = editor.getValue();
	console.log("Run");
	console.log(code);

	// needs to end in appropriate extension
	const fileName = "run"
	const sourceFileName = `${fileName}.ts`;
	const compiledFileName = `${fileName}.js`;
	const program = createProgram(sourceFileName, code);

	let compiledCode = "";
	const result = program.emit(undefined, (fileName, data) => {
		if (fileName === compiledFileName) {
			//console.log(fileName);
			//console.log(data);
			compiledCode = data;
		}
	}, undefined, false, {before:[createTsToTsTransform]});

	//const a: ts.CustomTransformers
	//console.log(result.emittedFiles);
	//console.log(compiledCode);

	eval(compiledCode);

	// now compile and execute
}



export function createProgram(
    inputFileName: string,
    typescriptInput: string
): ts.Program {
    // outputs
    // let outputText: string | undefined;
    // let sourceMapText: string | undefined;

    // options
    const compilerOptions: ts.CompilerOptions = {
        target: ts.ScriptTarget.ES2020,
		sourceMap: true,
		inlineSourceMap: true,
		inlineSources: true,
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



function createTsToTsTransform(context: ts.TransformationContext): (file: ts.SourceFile) => ts.SourceFile {
    const { factory } = context;


	function createConsoleLog() {
		const message = "start"
		return factory.createExpressionStatement(factory.createCallExpression(
			  factory.createPropertyAccessExpression(
				factory.createIdentifier("console"),
				factory.createIdentifier("log")
			  ),
			  undefined,
			  [factory.createStringLiteral(message)]
			));
	}

	// replace sort with reverse
    function visitor(node: ts.Node): ts.VisitResult<ts.Node> {
        // if (ts.isBlock(node)) {
        //     const awaitExpr = factory.createAwaitExpression(factory.createNumericLiteral(0));
        //     return factory.updateBlock(node, [
        //         factory.createExpressionStatement(awaitExpr),
        //         ...node.statements
        //     ]);
		// }
		

		// Swap Identifiers
        if (ts.isIdentifier(node) && ts.idText(node) === "sort") {
            const replacement = factory.createIdentifier("reverse");
            ts.setSourceMapRange(replacement, node);
            return replacement;
        }

        return ts.visitEachChild(node, visitor, context);
    }

	function visitSourceFile(file: ts.SourceFile): ts.SourceFile {
		// start custom ts to ts transformation

		// hmm.. inserting the debugger statement directly brings to compiled JavaScript

		// const newFile = factory.updateSourceFile(file, [factory.createDebuggerStatement(), ...file.statements]);
		// return ts.visitEachChild(newFile, visitor, context);

		// Manipulate and insert anything that is needed at the beginning of the file
		const newFile = factory.updateSourceFile(file, [createConsoleLog(), ...file.statements]);
		return ts.visitEachChild(newFile, visitor, context);
	}



    return visitSourceFile;
}
