export interface Comparable<T> {
    compareTo(obj: T): number;
}
export declare function compareDate(first: Date, second: Date): number;
