/**
 * A date, that points date-time always in local time.
 */
export declare class LocalDate extends Date {
    static readonly jsonTypeName = "LocalDate";
    static fromJSON(json: any): LocalDate;
    toJSON(): any;
}
