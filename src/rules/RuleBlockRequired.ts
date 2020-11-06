import ts from "typescript";
import { Rule } from "./Rule";
import { RuleResult } from "./RuleResult";

export class RuleBlockRequired implements Rule {
    constructor() {}

    readonly name = "RuleBlockRequired";

    readonly description = `Require blocks on all loops and if else statements`;

    run(node: ts.Node): RuleResult[] {
        const result: RuleResult[] = [];

        if (ts.isIfStatement(node)) {
            const { thenStatement, elseStatement } = node as ts.IfStatement;
            const thenIsBlock = ts.isBlock(thenStatement);
            const elseIsIf =
                elseStatement === undefined || ts.isIfStatement(elseStatement);

            if (!thenIsBlock) {
                result.push({
                    node,
                    message: `${this.name} If Statements must have blocks`
                });
            }

            if (!elseIsIf) {
                result.push({
                    node: node,
                    message: `${this.name} Else Statements must have blocks`
                });
            }

        } else if (
            ts.isForStatement(node) ||
            ts.isForInStatement(node) ||
            ts.isForOfStatement(node) ||
            ts.isWhileStatement(node)
        ) {
            const statement = (node as
                | ts.ForStatement
                | ts.ForInStatement
                | ts.ForOfStatement
                | ts.WhileStatement).statement;
            const hasBlock = ts.isBlock(statement);

            if (!hasBlock) {
                result.push({
                    node: node,
                    message: `${this.name} Loops must have blocks`
                });
            }
        }

        return result;
    }
}
