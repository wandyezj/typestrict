import ts from "typescript";
import { Rule } from "./rules/Rule";
import { RuleBlockRequired } from "./rules/RuleBlockRequired";
import { RuleSyntaxKind } from "./rules/RuleSyntaxKind";
import { RuleResult } from "./rules/RuleResult";
import { RuleNameRegex } from "./rules/RuleNameRegex";
import { RuleFunctionDeclaration } from "./rules/RuleFunctionDeclaration";
import { Issue } from "./Issue";
// import { getSourceFileNode } from "./getSourceFileNode";
import { visitNodesAndCallback } from "./visitNodesAndCallback";
import { createProgram } from "./createProgram";
import { RuleCallbacksAreArrowFunctions } from "./rules/RuleCallbacksAreArrowFunctions";
/**
 * contains all of the rules that are registered to run
 */
export class Rules {
    readonly name = "RuleRegistry";

    readonly description = `Aggregation of multiple rules`;

    readonly errors: string[] = [];
    readonly results: RuleResult[] = [];
    private rules: Rule[] = [];

    get pass(): boolean {
        return this.errors.length === 0;
    }

    private codeFileName = "code.ts";
    private program: ts.Program;
    private typeChecker: ts.TypeChecker;
    private sourceFile: ts.SourceFile | undefined;
    constructor(code: string) {
        this.program = createProgram(this.codeFileName, code);
        this.sourceFile = this.program.getSourceFile(this.codeFileName);
        this.typeChecker = this.program.getTypeChecker();
    }

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

    addRuleNameRegex(options: { functionName: RegExp; variableName: RegExp }) {
        const rule = new RuleNameRegex(options);
        this.addRule(rule);
    }

    addRuleFunctionDeclaration() {
        const rule = new RuleFunctionDeclaration();
        this.addRule(rule);
    }

    addRuleCallbacksAreArrowFunctions() {
        const rule = new RuleCallbacksAreArrowFunctions();
        this.addRule(rule);
    }

    run(): Issue[] {
        // if acting on a single source file then external symbols cannot be resolved
        // const program = createProgram("file", code);
        // const sourceFile =  program.getSourceFile("file");
        // if (!sourceFile) {
        //     return [];
        // }
        if (!this.sourceFile) {
            throw "Source File not defined";
        }

        const sourceFile = this.sourceFile;
        //getSourceFileNode(this.code);

        visitNodesAndCallback(sourceFile, (node: ts.Node) => {
            this.runRules(node);
        });

        // print all the messages
        // rules.errors.forEach((error) => {
        //     console.log(error);
        // });

        const issues = this.results.map((result) => {
            const { code, message, node } = result;

            const { pos, end } = node;

            const open = sourceFile.getLineAndCharacterOfPosition(pos);
            const close = sourceFile.getLineAndCharacterOfPosition(end);

            const issue: Issue = {
                code: code || "?",
                message,
                pos,
                end,
                startLineNumber: open.line,
                endLineNumber: close.line,
                startColumn: open.character,
                endColumn: close.character,
            };

            return issue;
        });
        return issues;
    }

    // run for every node individually
    // really this needs to be broken up inside into two versions
    // one version for each individual node
    // one version for holistic linters that need access to the entire AST tree
    private runRules(node: ts.Node): RuleResult[] {
        // want to know for each node which rules failed and why
        // run all the rule on the node

        const results = this.rules
            .map((rule) => rule.run(node, { typeChecker: this.typeChecker }))
            .filter((results) => results.length > 0)
            //.flat(1);
            .reduce((acc, val) => acc.concat(val), []);

        // this.results.push(...results);
        results.forEach((result) => {
            this.results.push(result);
        });

        const formatNode = (node: ts.Node) =>
            `node: [${node.pos}, ${node.end}] ${node.getText()}`;
        const messages = results.map(
            (result) => `${formatNode(node)}\n\t\t${result.message}`
        );
        const message = `${formatNode(node)}\n\t${messages.join("\n\t")}`;

        //this.errors.push(...message);
        this.errors.push(message);

        return results;
    }
}
