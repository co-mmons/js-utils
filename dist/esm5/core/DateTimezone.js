import { TimeZoneDate } from "./TimeZoneDate";
/**
 * @deprecated
 */
var DateTimezone = /** @class */ (function () {
    function DateTimezone(dateOrEpoch, timezone) {
        this.timezone = timezone;
        if (typeof dateOrEpoch === "number") {
            this.date = new Date(dateOrEpoch);
        }
        else if (dateOrEpoch instanceof Date) {
            this.date = new Date(dateOrEpoch.getTime());
        }
    }
    DateTimezone.timezoneOffset = function (timezone, date) {
        return TimeZoneDate.timezoneOffset(timezone, date);
    };
    DateTimezone.fromJSON = function (json) {
        if (typeof json === "object" && json && json["timezone"] && json["date"]) {
            return new DateTimezone(json["date"], json["timezone"]);
        }
        else if (json instanceof Date) {
            return new DateTimezone(json);
        }
        else if (typeof json === "number") {
            return new DateTimezone(json);
        }
    };
    DateTimezone.prototype.epoch = function () {
        return this.date.valueOf();
    };
    DateTimezone.prototype.toJSON = function () {
        return { "@type": "DateTimezone", date: this.date.getTime(), timezone: this.timezone };
    };
    return DateTimezone;
}());
export { DateTimezone };
//# sourceMappingURL=DateTimezone.js.map