/*

tests need a way to 
- only enable specific rules
- check which rule failed for what node

More Rules
- declared identifier matches regex

*/

import {allCaseJson, checkTs} from "./external";


describe("basic", () => {

    allCaseJson.forEach(({name, options,cases}, index) => {
        describe(name || `[${index}]`, () => {
            cases.forEach(({name, code, pass}, index) => {

                test(name || `[${index}] ${code}`, () => {
                    const actualPass = checkTs(code, options);
                    expect(actualPass).toBe(pass);
                });
        
            });
        })

    });

});
