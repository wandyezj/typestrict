export const code = `
function main() {
	// Hello
	console.log("Hello World");
	
	// Iteration
	for(let i = 0; i < 3; i++) {
		console.log(i);
	}

	const letters = ["a", "b", "c"];
	// sort should maintain the existing order, but since it is transformed it reverses the order
	letters.sort();
	letters.forEach((letter) => {
		console.log(letter);
	});
}


main();
`


// `

// // A Simple World


// function goodDeclaredFunction() {
// 	console.log("Hello world!");
// }



// function outside() {
// 	function insideBad() {

// 	}
// }

// function goodIf(check: () => boolean) {
// 	if (check()) {

// 	} else if (check()) {
	
// 	} else {
	
// 	}
// }

// function badIf() {
// 	if (true) console.log("if");
// }

// function badElse(check: boolean) {
// 	if (check) {

// 	} else 
// 		console.log("else");
// }

// function FunctionsThatStartWithCapitolsLettersAreNotOk() {

// }


// class Blocked {
// 	constructor() {}
// }


// `;