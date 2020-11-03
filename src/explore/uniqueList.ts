export function uniqueList<T>(a: T[]): T[] {
    const set = new Set<T>(a);
    const unique: T[] = [];
    set.forEach((item) => {
        unique.push(item);
    });
    return unique;
}
