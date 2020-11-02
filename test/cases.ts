// should also enable rules to enable for the case

// really want to discover the syntax kind set for each example
// describe syntax allowable and then ban everything else
export const cases: { name?: string, pass: boolean, code: string }[] = [
    {
        pass: true,
        code: `const x = 0'`
    },
    {
        pass: true,
        code: `let x = "value"`,
    },
    {
        pass: true,
        code: `let x = "value"`,
    },
    {
        pass: true,
        code: `for (let i =0; i < 3; i++) {}`
    },
    {
        pass: false,
        code: `var x = "value"`,
    }
    ,

]