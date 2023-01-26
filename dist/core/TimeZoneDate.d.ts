import { clone, Clone } from "./clone";
declare type TimeZone = string | "current" | undefined | null;
export declare class TimeZoneDate extends Date implements Clone<TimeZoneDate> {
    static readonly jsonTypeName = "TimeZoneDate";
    static fromJSON(json: any): TimeZoneDate;
    constructor();
    constructor(epoch: number, timeZone?: TimeZone);
    constructor(date: Date, timeZone?: TimeZone);
    constructor(isoDateString: string, timeZone?: TimeZone);
    timeZone: TimeZone;
    [clone](): TimeZoneDate;
    toString(): any;
    toJSON(): any;
}
export {};
