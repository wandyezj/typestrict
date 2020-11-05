import ts from "typescript";
import { visitNodesAndCallback } from "../visitNodesAndCallback";
import { Rule } from "./Rule";
import { RuleResult } from "./RuleResult";

export class RuleFunctionDeclaration implements Rule {
    constructor() {}

    readonly name = "RuleFunctionDeclaration";

    readonly description = `Require all functions declarations be at file scope, they may not be part of namespaces`;

    run(node: ts.Node): RuleResult[] {
        const result: RuleResult[] = [];

        if (ts.isSourceFile(node)) {
            // Root Node
            // Only run on the root node since we want to recurse the entire tree only once

            const sourceFile = node as ts.SourceFile;
            sourceFile.statements.forEach((statement) => {
                // Should this handle namespaces?
                // Going to say no, namespaces should not be used, thats the point of imports and exports
                if (ts.isFunctionDeclaration(statement)) {
                    const declaration = statement as ts.FunctionDeclaration;

                    // any additional declarations inside of this function need to be marked
                    visitNodesAndCallback(declaration.body, (node: ts.Node)=> {
                        if (ts.isFunctionDeclaration(node)) {
                            result.push({
                                node: node,
                                issue: `${this.name} All functions must be declared at the top level`
                            });
                        }
                    });
                }
            });
        }

        return result;
    }
}
