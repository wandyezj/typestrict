import ts from "typescript";
import { RuleResult } from "./RuleResult";

export interface Rule {
    readonly name: string;
    readonly description: string;
    
    /**
     * 
     * @param node
     * @returns empty array if no issues
     */
    run(node: ts.Node): RuleResult[];
}
