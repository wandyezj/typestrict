/*

tests need a way to 
- only enable specific rules
- check which rule failed for what node

More Rules
- declared identifier matches regex

*/

test("basic", () => {
    console.log("basic");
});

// should also enable rules to enable for the case

// really want to discover the syntax kind set for each example
// describe syntax allowable and then ban everything else
const cases: {name?: string, pass: boolean, code: string}[] = [
{
    pass: true,
code:`
const x = 0'
`
},
{
    pass: true,
code:`
let x = "value"
`,
}
,
{
    pass: false,
code:`
var x = "value"
`,
}
,
{
    pass: true,
code:`
let x = "value"
`,
}

]