
import ts from "typescript";
import { Rule } from "./Rule";
import { RuleResult } from "./RuleResult";

export class RuleCallbacksAreArrowFunctions implements Rule {
    constructor() {}

    readonly name = "RuleCallbackAreArrowFunctions";

    readonly description = `Require that all callbacks passed to functions be inline defined arrow functions`;

    run(node: ts.Node): RuleResult[] {
        const result: RuleResult[] = [];

        if (ts.isCallExpression(node)) {
            // need to check the call expressions identifier and figure out its type

            // const callExpression = node as ts.CallExpression;
            // // identifier
            // // arguments
            // const {expression, arguments} = callExpression;

            // if (ts.isIdentifier(expression)) {
            //     const identifier = expression as ts.Identifier;
            //     identifier.

            // )

        }

        return result;
    }
}
