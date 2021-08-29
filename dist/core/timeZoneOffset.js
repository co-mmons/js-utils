"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timeZoneOffset = void 0;
const offsetDateRegex = /(\d+).(\d+).(\d+),?\s+(\d+).(\d+)(.(\d+))?/;
const offsetFormatOptions = { timeZone: "UTC", hour12: false, year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" };
const offsetUsFormatter = new Intl.DateTimeFormat("en-US", offsetFormatOptions);
function timeZoneOffset(timeZone, date) {
    if (!date) {
        date = new Date();
    }
    function parseDate(dateString) {
        dateString = dateString.replace(/[\u200E\u200F]/g, "");
        return [].slice.call(offsetDateRegex.exec(dateString), 1).map(Math.floor);
    }
    function diffMinutes(d1, d2) {
        let day = d1[1] - d2[1];
        let hour = d1[3] - d2[3];
        let min = d1[4] - d2[4];
        if (day > 15)
            day = -1;
        if (day < -15)
            day = 1;
        return 60 * (24 * day + hour) + min;
    }
    const formatter = new Intl.DateTimeFormat("en-US", Object.assign({}, offsetFormatOptions, { timeZone: timeZone }));
    return diffMinutes(parseDate(offsetUsFormatter.format(date)), parseDate(formatter.format(date)));
}
exports.timeZoneOffset = timeZoneOffset;
//# sourceMappingURL=timeZoneOffset.js.map