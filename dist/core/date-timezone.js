"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.DateTimezone = DateTimezone;
//# sourceMappingURL=date-timezone.js.map