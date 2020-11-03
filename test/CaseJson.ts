export interface CaseJson {
    name?: string,
    description?: string,
    options?: {
        rules?: {
            syntaxKind?: {};
            blockRequired?: {};
        },
    },
    cases: {
        name?: string,
        pass: boolean, 
        code: string
    }[]
};
