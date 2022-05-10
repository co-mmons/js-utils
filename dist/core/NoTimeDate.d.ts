/**
 * A date, that points to absolute date - no time, no time zone, just year-month-date.
 */
export declare class NoTimeDate extends Date {
    static readonly jsonTypeName = "NoTimeDate";
    static fromJSON(json: any): NoTimeDate;
    toJSON(): any;
}
