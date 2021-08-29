export class TimeZoneDate extends Date {
    constructor(dateOrEpoch, timeZone) {
        if (dateOrEpoch !== undefined) {
            super(dateOrEpoch);
        }
        else {
            super();
        }
        this.timeZone = timeZone;
    }
    static fromJSON(json) {
        if (typeof json === "object" && json && json["timeZone"] && json["date"]) {
            return new TimeZoneDate(json["date"], json["timeZone"]);
        }
        else if (json instanceof Date) {
            return new TimeZoneDate(json);
        }
        else if (typeof json === "number") {
            return new TimeZoneDate(json);
        }
    }
    toJSON() {
        const json = { "@type": "TimeZoneDate", date: super.toJSON() };
        if (this.timeZone) {
            json["timeZone"] = this.timeZone;
        }
        return json;
    }
}
TimeZoneDate.jsonTypeName = "TimeZoneDate";
//# sourceMappingURL=TimeZoneDate.js.map