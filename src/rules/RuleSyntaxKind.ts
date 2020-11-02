import ts from "typescript";
import { Rule } from "../Rule";

export class RuleSyntaxKind implements Rule {
    constructor(private kinds: Set<ts.SyntaxKind>) {}

    readonly name = "RuleSyntaxKind";

    run(node: ts.Node): RuleResult {
        const relevant = true;
        const pass = this.kinds.has(node.kind);
        const message = pass
            ? undefined
            : `Invalid SyntaxKind ${ts.SyntaxKind[node.kind]}`;

        const result: RuleResult = {
            relevant,
            pass,
            message,
        };

        return result;
    }
}
