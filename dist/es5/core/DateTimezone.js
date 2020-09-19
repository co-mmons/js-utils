"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateTimezone = void 0;
var TimeZoneDate_1 = require("./TimeZoneDate");
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
        return TimeZoneDate_1.TimeZoneDate.timezoneOffset(timezone, date);
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
exports.DateTimezone = DateTimezone;
//# sourceMappingURL=DateTimezone.js.map