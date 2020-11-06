import * as monaco from 'monaco-editor';
import './index.css';

import {getIssues} from "../../src/index"

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

const language = "typescript";
const code = `function normal() {
    console.log("Hello world!");
}

// Good
function outside() {
	
	// Bad - functions are not allowed in other functions
	function inside() {

	}
}

// Good
if (true) {

} else if (true) {

} else {

}

// Bad - must have block
if (true) console.log("if");

if (true) {

// Bad - else must have block
} else console.log("else")


// Bad - functions should start with a lowercase letter
function Invalid() {

}



`;


const editor = monaco.editor.create(document.body, {
	value: code,
	language,
});

// initial lint run
//runLinter();

//const uri = monaco.Uri.file("test");
const model = editor.getModel();

// seems like this could be simpler
function debounce(callback: () => void, delayMilliseconds: number) {
	let timer;
	return function () {
		const context = this;
		const args = arguments;
		clearTimeout(timer);
		timer = setTimeout(() => callback.apply(context, args), delayMilliseconds);
	}
}

const linterDelayMilliseconds = 1000;
model.onDidChangeContent(debounce(() => {
runLinter();
}, linterDelayMilliseconds));


function runLinter() {
	const owner = "test";


	// const marker: monaco.editor.IMarkerData = {
	// 	code:"code",
	// 	message: "message",
	// 	severity: monaco.MarkerSeverity.Error,
	// 	startLineNumber:1,
	// 	endLineNumber: 1,
	// 	startColumn: 1,
	// 	endColumn: 4,
	// }
	const code = editor.getValue();

	const markers: monaco.editor.IMarkerData[] = getMarkers(code);
	// [marker];
	monaco.editor.setModelMarkers(model, owner, markers);
}

function getMarkers(code: string) {
	const issues = getIssues(code);
	const markers: monaco.editor.IMarkerData[] = issues.map((issue) => {
		return {
			...issue,
			severity: monaco.MarkerSeverity.Error,
		}
	});

	return markers;
}
