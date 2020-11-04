import ts from "typescript";
import { Rule } from "./Rule";
import { RuleBlockRequired } from "./RuleBlockRequired";
import { RuleSyntaxKind } from "./RuleSyntaxKind";
import {RuleResult} from "./RuleResult";
import { RuleNameRegex } from "./RuleNameRegex";

/**
 * contains all of the rules that are registered to run
 */
export class Rules implements Rule {
    readonly name = "RuleRegistry";

    readonly description = `Aggregation of multiple rules`;

    readonly errors: string[] = [];
    private rules: Rule[] = [];

    get pass(): boolean {
        return this.errors.length === 0;
    }

    constructor() {}

    private addRule(rule: Rule) {
        this.rules.push(rule);
    }
    // Add all the rules
    addRuleSyntaxKind(kinds: ts.SyntaxKind[]) {
        const rule = new RuleSyntaxKind(new Set<ts.SyntaxKind>(kinds));
        this.addRule(rule);
    }

    addRuleBlockRequired() {
        const rule = new RuleBlockRequired();
        this.addRule(rule);
    }

    addRuleNameRegex(options: {functionName: RegExp, variableName: RegExp}) {
        const rule = new RuleNameRegex(options);
        this.addRule(rule);
    }

    // run for every node individually
    // really this needs to be broken up inside into two versions
    // one version for each individual node
    // one version for holistic linters that need access to the entire AST tree
    run(node: ts.Node) : RuleResult[]{
        // want to know for each node which rules failed and why
        // run all the rule on the node
        const results = this.rules
            .map((rule) => rule.run(node))
            .filter((list) => list.length > 0)
            .flat(1);

        const formatNode = (node: ts.Node) => `node: [${node.pos}, ${node.end}] ${node.getText()}`;
        const messages = results.map((result) => `${formatNode(node)}\n\t\t${result.issue}`);

        this.errors.push(...messages);

        const issue = `${formatNode(node)}\n\t${messages.join("\n\t")}`;
        const result: RuleResult[] = messages.length === 0 ? [] : [{
            node,
            issue,
        }];

        return result;
    }
}
