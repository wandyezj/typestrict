import * as casesJson  from "./examples.json"
// should also enable rules to enable for the case

// really want to discover the syntax kind set for each example
// describe syntax allowable and then ban everything else
export const cases: { name?: string, pass: boolean, code: string }[] = casesJson;