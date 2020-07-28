"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateTimezone = void 0;
var offsetDateRegex = /(\d+).(\d+).(\d+),?\s+(\d+).(\d+)(.(\d+))?/;
var offsetFormatOptions = { timeZone: "UTC", hour12: false, year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" };
var offsetUsFormatter = new Intl.DateTimeFormat("en-US", offsetFormatOptions);
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
        if (!date) {
            date = new Date();
        }
        function parseDate(dateString) {
            dateString = dateString.replace(/[\u200E\u200F]/g, "");
            return [].slice.call(offsetDateRegex.exec(dateString), 1).map(Math.floor);
        }
        function diffMinutes(d1, d2) {
            var day = d1[1] - d2[1];
            var hour = d1[3] - d2[3];
            var min = d1[4] - d2[4];
            if (day > 15)
                day = -1;
            if (day < -15)
                day = 1;
            return 60 * (24 * day + hour) + min;
        }
        var formatter = new Intl.DateTimeFormat("en-US", Object.assign({}, offsetFormatOptions, { timeZone: timezone }));
        return diffMinutes(parseDate(offsetUsFormatter.format(date)), parseDate(formatter.format(date)));
    };
    DateTimezone.fromJSON = function (json) {
        if (typeof json === "object" && json && json["timezone"] && json["date"]) {
            return new DateTimezone(json["date"], json["timezone"]);
        }
        else if (typeof json === "number") {
            return new DateTimezone(json);
        }
    };
    DateTimezone.prototype.toJSON = function () {
        return { "@type": "intl/DateTimezone", date: this.date.getTime(), timezone: this.timezone };
    };
    return DateTimezone;
}());
exports.DateTimezone = DateTimezone;
//# sourceMappingURL=date-timezone.js.map