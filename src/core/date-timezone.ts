export class DateTimezone {

    constructor(timezone: string, epoch: number);

    constructor(timezone: string, date: Date);

    constructor(timezone: string, dateOrEpoch: Date | number) {

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
        return {timezone: this.timezone, date: this.date.getTime()};
    }

    fromJSON(json: any) {
        if (typeof json === "object" && json["timezone"] && json["date"]) {
            this.constructor.call(this, json["timezone"], json["date"]);
        }
    }
}
