declare type TimeZone = string | "current" | undefined | null;
/**
 * @deprecated
 */
export declare class TimeZoneDate extends Date {
    static readonly jsonTypeName = "TimeZoneDate";
    static fromJSON(json: any): TimeZoneDate;
    constructor();
    constructor(epoch: number, timeZone?: TimeZone);
    constructor(date: Date, timeZone?: TimeZone);
    constructor(isoDateString: string, timeZone?: TimeZone);
    timeZone: TimeZone;
    toJSON(): any;
}
export {};
