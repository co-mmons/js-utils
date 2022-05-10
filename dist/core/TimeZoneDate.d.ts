declare type TimeZone = string | "current" | "local" | undefined | null;
export declare class TimeZoneDate extends Date {
    static readonly jsonTypeName = "TimeZoneDate";
    static fromJSON(json: any): TimeZoneDate;
    constructor();
    constructor(epoch: number, timeZone?: TimeZone);
    constructor(date: Date, timeZone?: TimeZone);
    constructor(isoDateString: string, timeZone?: TimeZone);
    /**
     * Time zone or:
     * * undefined, null or "current" if device time zone should be used when presenting date
     * * "locale" if date/time should be treated as local no matter what time zone is set on the device
     */
    timeZone: TimeZone;
    toJSON(): any;
}
export {};
