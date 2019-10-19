export declare class DateTimezone {
    static timezoneOffset(timezone: string, date?: Date): number;
    constructor(epoch: number, timezone?: string);
    constructor(date: Date, timezone?: string);
    private $constructor;
    readonly date: Date;
    readonly timezone: string;
    toJSON(): {
        date: number;
        timezone: string;
    };
    fromJSON(json: any): void;
}
