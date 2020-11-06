import ts from "typescript";
import { Rule } from "./Rule";
import { RuleResult } from "./RuleResult";

export class RuleSyntaxKind implements Rule {
    constructor(private kinds: Set<ts.SyntaxKind>) {}

    readonly name = "RuleSyntaxKind";

    readonly description = `Allow only specified SyntaxKinds`;

    run(node: ts.Node): RuleResult[] {
        const pass = this.kinds.has(node.kind);

        const result: RuleResult[] = pass? [] :[{
            node,
            message: `${this.name} Unsupported SyntaxKind ${ts.SyntaxKind[node.kind]}`,
        }];

        return result;
    }
}
