"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DateTimezone = /** @class */ (function () {
    function DateTimezone(timezone, dateOrEpoch) {
        this.timezone = timezone;
        if (typeof dateOrEpoch === "number") {
            this.date = new Date(dateOrEpoch);
        }
        else if (dateOrEpoch instanceof Date) {
            this.date = new Date(dateOrEpoch.getTime());
        }
    }
    DateTimezone.prototype.toJSON = function () {
        return { timezone: this.timezone, date: this.date.getTime() };
    };
    DateTimezone.prototype.fromJSON = function (json) {
        if (typeof json === "object" && json["timezone"] && json["date"]) {
            this.constructor.call(this, json["timezone"], json["date"]);
        }
    };
    return DateTimezone;
}());
exports.DateTimezone = DateTimezone;
//# sourceMappingURL=date-timezone.js.map