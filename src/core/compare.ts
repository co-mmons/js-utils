export interface Comparable<T> {
    compareTo(obj: T): number;
}

export function compareDate(first: Date, second: Date): number {
    return (first ? first.getTime() : 0) - (second ? second.getTime() : 0);
}
