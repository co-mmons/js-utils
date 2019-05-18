export declare class DateTimezone {
    constructor(epoch: number, timezone?: string);
    constructor(date: Date, timezone?: string);
    readonly date: Date;
    readonly timezone: string;
    toJSON(): {
        date: number;
        timezone: string;
    };
    fromJSON(json: any): void;
}
