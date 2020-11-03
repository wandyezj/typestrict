import ts from "typescript";
import { Rule } from "./Rule";

export class RuleBlockRequired implements Rule {
    constructor() {}

    readonly name = "RuleBlockRequired";

    readonly description = `Require blocks on all loops and if else statements`;

    run(node: ts.Node): RuleResult {
        let relevant = false;
        let pass = true;
        if (ts.isIfStatement(node)) {
            const { thenStatement, elseStatement } = node as ts.IfStatement;
            const thenIsBlock = ts.isBlock(thenStatement);
            const elseIsIf =
                elseStatement === undefined || ts.isIfStatement(elseStatement);
            pass = thenIsBlock && elseIsIf;
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
            pass = ts.isBlock(statement);
        }

        const message = pass
            ? undefined
            : `Block Required on ${ts.SyntaxKind[node.kind]}`;

        const result: RuleResult = {
            relevant,
            pass,
            message,
        };

        return result;
    }
}
