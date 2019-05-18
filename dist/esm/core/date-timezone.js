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
    DateTimezone.prototype.toJSON = function () {
        return { date: this.date.getTime(), timezone: this.timezone };
    };
    DateTimezone.prototype.fromJSON = function (json) {
        if (typeof json === "object" && json["timezone"] && json["date"]) {
            this.constructor.call(this, json["date"], json["timezone"]);
        }
        else if (typeof json === "number") {
            this.constructor.call(this, json);
        }
    };
    return DateTimezone;
}());
export { DateTimezone };
//# sourceMappingURL=date-timezone.js.map