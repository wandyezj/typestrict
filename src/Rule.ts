import ts from "typescript";

export interface Rule {
    readonly name: string;
    run(node: ts.Node): RuleResult;
}
