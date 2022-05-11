/**
 * A date, that points to absolute date - no time, no time zone, just year-month-date.
 */
export class NoTimeDate extends Date {
    static fromJSON(json) {
        if (typeof json === "object" && json && json["date"]) {
            const d = new NoTimeDate(json["date"]);
            d.setUTCHours(0, 0, 0, 0);
            return d;
        }
        else if (json instanceof Date || typeof json === "number") {
            const d = new NoTimeDate(json);
            d.setUTCHours(0, 0, 0, 0);
            return d;
        }
    }
    getFullYear() {
        return super.getUTCFullYear();
    }
    getMonth() {
        return super.getUTCMonth();
    }
    getDate() {
        return super.getUTCDate();
    }
    getDay() {
        return super.getUTCDay();
    }
    getHours() {
        return 0;
    }
    getMinutes() {
        return 0;
    }
    getSeconds() {
        return 0;
    }
    getMilliseconds() {
        return 0;
    }
    getTimezoneOffset() {
        return 0;
    }
    setTime(time) {
        super.setTime(time);
        this.setUTCHours(0, 0, 0, 0);
        return this.getTime();
    }
    setMilliseconds(ms) {
        return this.setUTCMilliseconds(ms);
    }
    setSeconds(sec, ms) {
        return this.setUTCSeconds(sec, ms);
    }
    setMinutes(min, sec, ms) {
        return this.setUTCMinutes(min, sec, ms);
    }
    setHours(hours, min, sec, ms) {
        return this.setUTCHours(hours, min, sec, ms);
    }
    getUTCHours() {
        return 0;
    }
    getUTCMinutes() {
        return 0;
    }
    getUTCSeconds() {
        return 0;
    }
    getUTCMilliseconds() {
        return 0;
    }
    setUTCMilliseconds(ms) {
        super.setUTCMilliseconds(ms);
        return super.setUTCHours(0, 0, 0, 0);
    }
    setUTCSeconds(sec, ms) {
        super.setUTCSeconds(sec, ms);
        return super.setUTCHours(0, 0, 0, 0);
    }
    setUTCMinutes(min, sec, ms) {
        super.setUTCMinutes(min, sec, ms);
        return super.setUTCHours(0, 0, 0, 0);
    }
    setUTCHours(hours, min, sec, ms) {
        super.setUTCHours(hours, min, sec, ms);
        return super.setUTCHours(0, 0, 0, 0);
    }
    setDate(date) {
        return super.setUTCDate(date);
    }
    setMonth(month, date) {
        return super.setUTCMonth(month, date);
    }
    setFullYear(year, month, date) {
        return super.setUTCFullYear(year, month, date);
    }
    toDateString() {
        return new Intl.DateTimeFormat(undefined, {
            timeZone: "UTC",
            timeZoneName: undefined,
            hour: undefined,
            minute: undefined,
            second: undefined
        }).format(this);
    }
    toTimeString() {
        return new Intl.DateTimeFormat(undefined, {
            timeZone: "UTC",
            timeZoneName: undefined,
            year: undefined,
            month: undefined,
            day: undefined,
            weekday: undefined,
            era: undefined
        }).format(this);
    }
    toString() {
        return this.toDateString();
    }
    toJSON() {
        return { "@type": NoTimeDate.jsonTypeName, date: super.toJSON() };
    }
}
NoTimeDate.jsonTypeName = "NoTimeDate";
//# sourceMappingURL=NoTimeDate.js.map