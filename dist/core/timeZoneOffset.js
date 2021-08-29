"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timeZoneOffset = void 0;
function timeZoneOffset(timeZone, date) {
    if (!date) {
        date = new Date();
    }
    const utcDateTime = new Date(date.toLocaleString("en-US", { timeZone: "utc" }));
    const tzDateTime = new Date(date.toLocaleString("en-US", { timeZone }));
    return (utcDateTime.getTime() - tzDateTime.getTime());
}
exports.timeZoneOffset = timeZoneOffset;
//# sourceMappingURL=timeZoneOffset.js.map