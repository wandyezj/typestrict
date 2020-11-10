import ts from "typescript";
import { Rule } from "./Rule";
import { RuleResult } from "./RuleResult";

export class RuleNameRegex implements Rule {
    readonly functionName: RegExp | undefined;
    readonly variableName: RegExp | undefined;

    constructor(options: { functionName?: RegExp; variableName?: RegExp }) {
        const { functionName, variableName } = options;
        this.functionName = functionName;
        this.variableName = variableName;
    }

    readonly name = "RuleNameRegex";

    readonly description = `Allow only specified SyntaxKinds`;

    run(node: ts.Node): RuleResult[] {
        const result: RuleResult[] = [];

        if (this.functionName && ts.isFunctionDeclaration(node)) {
            const { name } = node as ts.FunctionDeclaration;
            const pass = testIdentifier(name, this.functionName);
            if (!pass) {
                result.push({
                    node,
                    message: `${this.name} Invalid Function Name`,
                });
            }
        } else if (this.variableName && ts.isVariableStatement(node)) {
            const { declarationList } = node as ts.VariableStatement;
            declarationList.forEachChild((node: ts.Node) => {
                if (ts.isVariableDeclaration(node)) {
                    const variable = node as ts.VariableDeclaration;
                    const identifier = variable.name;
                    if (ts.isIdentifier(identifier)) {
                        const pass = testIdentifier(
                            identifier,
                            this.variableName
                        );
                        if (!pass) {
                            result.push({
                                node,
                                message: `${this.name} Invalid Variable Name`,
                            });
                        }
                    }
                }
            });
        }

        return result;
    }
}

function testIdentifier(
    identifier: ts.Identifier | undefined,
    regex: RegExp | undefined
): boolean {
    const pass =
        identifier !== undefined &&
        regex !== undefined &&
        regex.test(identifier.text);
    return pass;
}
