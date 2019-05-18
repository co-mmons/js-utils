export declare class DateTimezone {
    constructor(timezone: string, epoch: number);
    constructor(timezone: string, date: Date);
    readonly date: Date;
    readonly timezone: string;
    toJSON(): {
        timezone: string;
        date: number;
    };
    fromJSON(json: any): void;
}
