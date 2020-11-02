import {cases, syntaxKinds} from "./external"

console.log("test");

cases.forEach((example) => {
    const {code} = example;

    const kinds = syntaxKinds(code);
    console.log(code);
    console.log(kinds.join("\n"))
});
