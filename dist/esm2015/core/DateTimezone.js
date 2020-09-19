import { TimeZoneDate } from "./TimeZoneDate";
/**
 * @deprecated
 */
export class DateTimezone {
    constructor(dateOrEpoch, timezone) {
        this.timezone = timezone;
        if (typeof dateOrEpoch === "number") {
            this.date = new Date(dateOrEpoch);
        }
        else if (dateOrEpoch instanceof Date) {
            this.date = new Date(dateOrEpoch.getTime());
        }
    }
    static timezoneOffset(timezone, date) {
        return TimeZoneDate.timezoneOffset(timezone, date);
    }
    static fromJSON(json) {
        if (typeof json === "object" && json && json["timezone"] && json["date"]) {
            return new DateTimezone(json["date"], json["timezone"]);
        }
        else if (json instanceof Date) {
            return new DateTimezone(json);
        }
        else if (typeof json === "number") {
            return new DateTimezone(json);
        }
    }
    epoch() {
        return this.date.valueOf();
    }
    toJSON() {
        return { "@type": "DateTimezone", date: this.date.getTime(), timezone: this.timezone };
    }
}
//# sourceMappingURL=DateTimezone.js.map