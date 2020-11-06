export interface Issue {
    code: string,
    message: string,
    pos: number,
    end: number,
    startLineNumber: number,
    endLineNumber: number,
    startColumn: number,
    endColumn: number,
}