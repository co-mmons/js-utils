export class TimeZoneDate extends Date {

    static readonly jsonTypeName = "TimeZoneDate";

    static fromJSON(json: any) {
        if (typeof json === "object" && json && json["timeZone"] && json["date"]) {
            return new TimeZoneDate(json["date"], json["timeZone"]);
        } else if (json instanceof Date) {
            return new TimeZoneDate(json);
        } else if (typeof json === "number") {
            return new TimeZoneDate(json);
        }
    }

    constructor();

    constructor(epoch: number, timeZone?: string);

    constructor(date: Date, timeZone?: string);

    constructor(isoDateString: string, timeZone?: string);

    constructor(dateOrEpoch?: Date | number | string, timeZone?: string) {

        if (dateOrEpoch !== undefined) {
            super(dateOrEpoch);
        } else {
            super();
        }

        this.timeZone = timeZone;
    }

    timeZone: string;

    toJSON(): any {

        const json = {"@type": "TimeZoneDate", date: super.toJSON()};

        if (this.timeZone) {
            json["timeZone"] = this.timeZone;
        }

        return json;
    }
}