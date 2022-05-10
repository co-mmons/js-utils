type TimeZone = string | "local" | undefined | null;

export class DateWithTimeZone extends Date {

    static readonly jsonTypeName = "DateWithTimeZone";

    static fromJSON(json: any) {
        if (typeof json === "object" && json && json["date"]) {
            return new DateWithTimeZone(json["date"], json["timeZone"]);
        } else if (json instanceof Date) {
            return new DateWithTimeZone(json);
        } else if (typeof json === "number") {
            return new DateWithTimeZone(json);
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

        if (dateOrEpoch instanceof DateWithTimeZone && arguments.length === 1) {
            this.timeZone = dateOrEpoch.timeZone;
        } else {
            this.timeZone = timeZone;
        }
    }

    /**
     * Time zone (IANA format) or:
     * * undefined or null if device time zone should be used when presenting date
     * * "local" if date/time should be treated as local no matter what time zone is set on the device
     */
    timeZone: TimeZone;

    toJSON(): any {

        const json = {"@type": DateWithTimeZone.jsonTypeName, date: super.toJSON()};

        if (this.timeZone) {
            json["timeZone"] = this.timeZone;
        }

        return json;
    }
}
