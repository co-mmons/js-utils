export declare class TimeZoneDate extends Date {
    static readonly jsonTypeName = "TimeZoneDate";
    static timezoneOffset(timezone: string, date?: Date): number;
    static fromJSON(json: any): TimeZoneDate;
    constructor();
    constructor(epoch: number, timeZone?: string);
    constructor(date: Date, timeZone?: string);
    constructor(isoDateString: string, timeZone?: string);
    timeZone: string;
    toJSON(): any;
}
