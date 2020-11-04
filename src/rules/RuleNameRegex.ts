import ts from "typescript";
import { Rule } from "./Rule";
import { RuleResult } from "./RuleResult";

export class RuleNameRegex implements Rule {
    readonly functionName: RegExp | undefined;
    constructor(options: {functionName?: RegExp}) {
        const {functionName} = options;
        this.functionName = functionName;
    }

    readonly name = "RuleNameRegex";

    readonly description = `Allow only specified SyntaxKinds`;

    run(node: ts.Node): RuleResult[] {
        const result: RuleResult[] = [];

        if (this.functionName && ts.isFunctionDeclaration(node)) {
            const {name, parent} = node as ts.FunctionDeclaration;
            
            if (parent === node) {
                console.log("parent");
            }
            const pass = testIdentifier(name, this.functionName);
            if (!pass) {
                result.push({
                    node,
                    issue: `${this.name} Invalid Function Name`,
                });
            }
        }

        return result;
    }
}

function testIdentifier(identifier: ts.Identifier | undefined, regex: RegExp): boolean {
    const pass = identifier !== undefined && regex.test(identifier.text);
    return pass;
}
