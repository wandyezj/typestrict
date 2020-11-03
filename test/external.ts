import { CaseJson } from "./CaseJson";

export {syntaxKinds} from "../src/explore/syntaxKinds";

export {uniqueList} from "../src/explore/uniqueList";
export {checkTs} from "../src/index";

// should also enable rules to enable for the case

// really want to discover the syntax kind set for each example
// describe syntax allowable and then ban everything else

export const ruleTest: CaseJson = require("./ruleTest.json");
export const ruleExamples: CaseJson = require("./ruleExamples.json");
export const ruleBlockRequired: CaseJson = require("./ruleBlockRequired.json");

export const allCaseJson: CaseJson[] = [
    ruleTest,
    ruleExamples,
    ruleBlockRequired,
];