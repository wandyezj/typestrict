import ts from "typescript";
import { Rule } from "../Rule";
import { RuleSyntaxKind } from "./RuleSyntaxKind";

/**
 * contains all of the rules that are registered to run
 */
export class Rules implements Rule {
    readonly errors: string[] = [];
    private rules: Rule[] = [];

    get pass(): boolean {
        return this.errors.length === 0;
    }

    constructor() {}

    // Add all the rules
    addRuleSyntaxKind(kinds: ts.SyntaxKind[]) {
        const rule = new RuleSyntaxKind(new Set<ts.SyntaxKind>(kinds));
        this.rules.push(rule);
    }

    readonly name = "RuleRegistry";

    run(node: ts.Node) {
        // want to know for each node which rules failed and why
        // run all the rule on the node
        const results = this.rules
            .map((rule) => {
                const result = rule.run(node);
                if (result.relevant && !result.pass) {
                    return `${rule.name} ${result.message}`;
                }
                return undefined;
            })
            .filter((result) => result !== undefined);

        const relevant = true;
        const pass = results.length === 0;

        const message = pass
            ? undefined
            : `node: ${node.getText()}\n${results.join("\n")}`;

        if (message) {
            this.errors.push(message);
        }

        const result: RuleResult = {
            relevant,
            pass,
            message,
        };

        return result;
    }
}
