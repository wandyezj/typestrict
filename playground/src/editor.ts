import * as monaco from 'monaco-editor';
import {getIssues} from "../../src/index"
import {code} from "./code";

const language = "typescript";

export const editor = monaco.editor.create(
	document.body, //.getElementById("editor"), 
	{
		value: code,
		language,
	}
);

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
