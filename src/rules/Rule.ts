import ts from "typescript";

export interface Rule {
    readonly name: string;
    readonly description: string;
    run(node: ts.Node): RuleResult;
}
