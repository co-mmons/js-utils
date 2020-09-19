import { __extends } from "tslib";
var offsetDateRegex = /(\d+).(\d+).(\d+),?\s+(\d+).(\d+)(.(\d+))?/;
var offsetFormatOptions = { timeZone: "UTC", hour12: false, year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" };
var offsetUsFormatter = new Intl.DateTimeFormat("en-US", offsetFormatOptions);
var TimeZoneDate = /** @class */ (function (_super) {
    __extends(TimeZoneDate, _super);
    function TimeZoneDate(dateOrEpoch, timeZone) {
        var _this = _super.call(this, dateOrEpoch) || this;
        _this.timeZone = timeZone;
        return _this;
    }
    TimeZoneDate.timezoneOffset = function (timezone, date) {
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
    TimeZoneDate.fromJSON = function (json) {
        if (typeof json === "object" && json && json["timeZone"] && json["date"]) {
            return new TimeZoneDate(json["date"], json["timeZone"]);
        }
        else if (json instanceof Date) {
            return new TimeZoneDate(json);
        }
        else if (typeof json === "number") {
            return new TimeZoneDate(json);
        }
    };
    TimeZoneDate.prototype.toJSON = function () {
        return { "@type": "TimeZoneDate", date: _super.prototype.toJSON.call(this), timeZone: this.timeZone };
    };
    return TimeZoneDate;
}(Date));
export { TimeZoneDate };
//# sourceMappingURL=TimeZoneDate.js.map