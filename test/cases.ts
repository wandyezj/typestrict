// should also enable rules to enable for the case

// really want to discover the syntax kind set for each example
// describe syntax allowable and then ban everything else
export interface CaseJson {
    options?: {
        rules?: {
            syntaxKind?: {};
            blockRequired?: {};
        },
    },
    cases: {
        name?: string,
        pass: boolean, 
        code: string
    }[]
};

export const ruleExamples: CaseJson = require("./ruleExamples.json");
export const ruleBlockRequired: CaseJson = require("./ruleBlockRequired.json");
