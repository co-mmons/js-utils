type TimeZone = string | "current" | "local" | undefined | null;

export class TimeZoneDate extends Date {

    static readonly jsonTypeName = "TimeZoneDate";

    static fromJSON(json: any) {
        if (typeof json === "object" && json && json["date"]) {
            return new TimeZoneDate(json["date"], json["timeZone"]);
        } else if (json instanceof Date) {
            return new TimeZoneDate(json);
        } else if (typeof json === "number") {
            return new TimeZoneDate(json);
        }
    }

    constructor();

    constructor(epoch: number, timeZone?: TimeZone);

    constructor(date: Date, timeZone?: TimeZone);

    constructor(isoDateString: string, timeZone?: TimeZone);

    constructor(dateOrEpoch?: Date | number | string, timeZone?: TimeZone) {

        if (dateOrEpoch !== undefined) {
            super(dateOrEpoch);
        } else {
            super();
        }

        this.timeZone = timeZone;
    }

    /**
     * Time zone or:
     * * undefined, null or "current" if device time zone should be used when presenting date
     * * "locale" if date/time should be treated as local no matter what time zone is set on the device
     */
    timeZone: TimeZone;

    toJSON(): any {

        const json = {"@type": "TimeZoneDate", date: super.toJSON()};

        if (this.timeZone && this.timeZone !== "current") {
            json["timeZone"] = this.timeZone;
        }

        return json;
    }
}
