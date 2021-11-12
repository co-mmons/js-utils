"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateTimezone = void 0;
const timeZoneOffset_1 = require("./timeZoneOffset");
/**
 * @deprecated
 */
class DateTimezone {
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
        return (0, timeZoneOffset_1.timeZoneOffset)(timezone, date) / 1000 / 60;
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
exports.DateTimezone = DateTimezone;
//# sourceMappingURL=DateTimezone.js.map