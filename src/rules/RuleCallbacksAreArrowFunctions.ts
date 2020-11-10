import ts from "typescript";
import { Rule } from "./Rule";
import { RuleResult } from "./RuleResult";

export class RuleCallbacksAreArrowFunctions implements Rule {
    constructor() {}

    readonly name = "RuleCallbackAreArrowFunctions";

    readonly description = `Require that all callbacks passed to functions be inline defined arrow functions`;

    run(node: ts.Node, options: { typeChecker: ts.TypeChecker }): RuleResult[] {
        const { typeChecker } = options;
        const result: RuleResult[] = [];

        if (ts.isCallExpression(node)) {
            // need to check the call expressions identifier and figure out its type

            const callExpression = node as ts.CallExpression;
            // identifier
            // arguments
            const {
                expression,
                //arguments
            } = callExpression;

            if (ts.isIdentifier(expression)) {
                const identifier = expression as ts.Identifier;

                const symbol = typeChecker.getSymbolAtLocation(identifier);
                if (symbol) {
                    const valueDeclaration = symbol.valueDeclaration;

                    if (valueDeclaration) {
                        if (ts.isFunctionDeclaration(valueDeclaration)) {
                            const functionDeclaration = valueDeclaration as ts.FunctionDeclaration;
                            const { parameters } = functionDeclaration;
                            parameters.forEach((parameter, index) => {
                                console.log(index);
                                const { type } = parameter;
                                if (type && ts.isFunctionTypeNode(type)) {
                                    console.log(
                                        "found function type node in call expression"
                                    );
                                    // TODO: check equivlange index in arguments
                                }
                            });
                        }
                    }
                }
            }
        }

        return result;
    }
}
