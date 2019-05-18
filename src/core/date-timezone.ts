export class DateTimezone {

    constructor(epoch: number, timezone?: string);

    constructor(date: Date, timezone?: string);

    constructor(dateOrEpoch: Date | number, timezone?: string) {

        this.timezone = timezone;

        if (typeof dateOrEpoch === "number") {
            this.date = new Date(dateOrEpoch);
        } else if (dateOrEpoch instanceof Date) {
            this.date = new Date(dateOrEpoch.getTime());
        }

    }

    readonly date: Date;

    readonly timezone: string;

    toJSON() {
        return {date: this.date.getTime(), timezone: this.timezone};
    }

    fromJSON(json: any) {
        if (typeof json === "object" && json["timezone"] && json["date"]) {
            this.constructor.call(this, json["date"], json["timezone"]);
        } else if (typeof json === "number") {
            this.constructor.call(this, json);
        }
    }
}
