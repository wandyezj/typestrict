import {ruleExamples, syntaxKinds, uniqueList} from "./external"

console.log("test");


const allowableKinds: string[] = [];

ruleExamples.cases.forEach((example) => {
    const {code, pass} = example;

    const kinds = syntaxKinds(code);

    if (pass) {
        allowableKinds.push(...kinds);
    }

    console.log(`${code}
${kinds.join("\n")}
    `);
});


console.log("\n\nRequired Kinds\n")
const uniqueKinds = uniqueList(allowableKinds);
console.log(uniqueKinds.map(name => 
    `ts.SyntaxKind.${name},`).join("\n"));

