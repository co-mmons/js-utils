declare type TimeZone = string | "local" | undefined | null;
export declare class DateWithTimeZone extends Date {
    static readonly jsonTypeName = "DateWithTimeZone";
    static fromJSON(json: any): DateWithTimeZone;
    constructor();
    constructor(epoch: number, timeZone?: TimeZone);
    constructor(date: Date, timeZone?: TimeZone);
    constructor(isoDateString: string, timeZone?: TimeZone);
    /**
     * Time zone (IANA format) or:
     * * undefined or null if device time zone should be used when presenting date
     * * "local" if date/time should be treated as local no matter what time zone is set on the device
     */
    timeZone: TimeZone;
    toJSON(): any;
}
export {};
