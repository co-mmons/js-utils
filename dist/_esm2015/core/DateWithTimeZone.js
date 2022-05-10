export class DateWithTimeZone extends Date {
    constructor(dateOrEpoch, timeZone) {
        if (dateOrEpoch !== undefined) {
            super(dateOrEpoch);
        }
        else {
            super();
        }
        if (dateOrEpoch instanceof DateWithTimeZone && arguments.length === 1) {
            this.timeZone = dateOrEpoch.timeZone;
        }
        else {
            this.timeZone = timeZone;
        }
    }
    static fromJSON(json) {
        if (typeof json === "object" && json && json["date"]) {
            return new DateWithTimeZone(json["date"], json["timeZone"]);
        }
        else if (json instanceof Date) {
            return new DateWithTimeZone(json);
        }
        else if (typeof json === "number") {
            return new DateWithTimeZone(json);
        }
    }
    toJSON() {
        const json = { "@type": DateWithTimeZone.jsonTypeName, date: super.toJSON() };
        if (this.timeZone) {
            json["timeZone"] = this.timeZone;
        }
        return json;
    }
}
DateWithTimeZone.jsonTypeName = "DateWithTimeZone";
//# sourceMappingURL=DateWithTimeZone.js.map