import { Rules } from "./Rules";
import {Issue} from  "./Issue";
import {syntaxKindDefault} from "./syntaxKindDefault";
// import {createProgram} from "./createProgram";

export interface CheckOptions {
        rules?: Partial<{
            syntaxKind: {};
            blockRequired: {};
            nameRegex:{};
            functionDeclaration:{};
        }>
}

export function getIssues(
    code: string,
    options: CheckOptions = {
        rules: {
            syntaxKind: {},
            blockRequired: {},
            nameRegex:{},
            functionDeclaration:{},
        }
    }
): Issue[] {
    // console.log(code);
    const rules = new Rules(code);

    const {
        syntaxKind,
        blockRequired,
        nameRegex,
        functionDeclaration
    } = options.rules || {};

    const enableSyntaxKind = syntaxKind !== undefined;
    if (enableSyntaxKind) {
        rules.addRuleSyntaxKind(syntaxKindDefault);
    }

    const enableBlockRequired = blockRequired !== undefined;
    if (enableBlockRequired) {
        // console.log("enableBlockRequired")
        rules.addRuleBlockRequired();
    }

    const enableNameRegex = nameRegex !== undefined;
    if (enableNameRegex) {
        // console.log("enableNameRegex")

        /*
        Function Names must:
            - be composed only ov upper and lower case ASCII letters
            - start with a lower case letter
            - end with a lower case letter
            - not have upper case letters next to each other
        */
        const functionName = /^[a-z]+([A-Z]{1}[a-z]+)*$/;
        const variableName = functionName;
        rules.addRuleNameRegex({
            functionName,
            variableName,
        });
    }

    const enableFunctionDeclaration = functionDeclaration !== undefined;
    if (enableFunctionDeclaration) {
        rules.addRuleFunctionDeclaration();
    }

    const issues = rules.run();

    return issues;
}

export function checkTs(
    code: string,
    options: CheckOptions = {}
): boolean {

    const issues = getIssues(code, options);
    return issues.length === 0;
}



function test() {
const program = `
function f(){function f(){}}
`;
const pass = checkTs(program, {
    rules: {
        blockRequired: {},
        syntaxKind: {},
        nameRegex:{},
        functionDeclaration:{},
    },
});

console.log(pass);
}
test();