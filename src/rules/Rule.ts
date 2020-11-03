import ts from "typescript";
import { RuleResult } from "./RuleResult";

export interface Rule {
    readonly name: string;
    readonly description: string;
    run(node: ts.Node): RuleResult;
}
