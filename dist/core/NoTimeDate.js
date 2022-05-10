"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoTimeDate = void 0;
/**
 * A date, that points to absolute date - no time, no time zone, just year-month-date.
 */
class NoTimeDate extends Date {
    static fromJSON(json) {
        if (typeof json === "object" && json && json["date"]) {
            return new NoTimeDate(json["date"]);
        }
        else if (json instanceof Date || typeof json === "number") {
            const d = new NoTimeDate(json);
            d.setUTCHours(0, 0, 0, 0);
            return d;
        }
    }
    toJSON() {
        return { "@type": NoTimeDate.jsonTypeName, date: super.toJSON() };
    }
}
exports.NoTimeDate = NoTimeDate;
NoTimeDate.jsonTypeName = "NoTimeDate";
//# sourceMappingURL=NoTimeDate.js.map