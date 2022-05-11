/**
 * A date, that points date-time always in local time.
 * It means, that UTC date/time will be shown in every time zone.
 */
export class LocalDate extends Date {

    static readonly jsonTypeName = "LocalDate";

    static fromJSON(json: any) {
        if (typeof json === "object" && json && json["date"]) {
            return new LocalDate(json["date"]);
        } else if (json instanceof Date) {
            return new LocalDate(json);
        } else if (typeof json === "number") {
            return new LocalDate(json);
        }
    }

    getFullYear(): number {
        return super.getUTCFullYear();
    }

    getMonth(): number {
        return super.getUTCMonth();
    }

    getDate(): number {
        return super.getUTCDate();
    }

    getDay(): number {
        return super.getUTCDay();
    }

    getHours(): number {
        return super.getUTCHours();
    }

    getMinutes(): number {
        return super.getUTCMinutes();
    }

    getSeconds(): number {
        return super.getUTCSeconds();
    }

    getMilliseconds(): number {
        return super.getUTCMilliseconds();
    }

    getTimezoneOffset(): number {
        return 0;
    }

    setTime(time: number): number {
        return super.setTime(time);
    }

    setMilliseconds(ms: number): number {
        return super.setUTCMilliseconds(ms);
    }

    setSeconds(sec: number, ms?: number): number {
        return super.setUTCSeconds(sec, ms);
    }

    setMinutes(min: number, sec?: number, ms?: number): number {
        return super.setUTCMinutes(min, sec, ms);
    }

    setHours(hours: number, min?: number, sec?: number, ms?: number): number {
        return super.setUTCHours(hours, min, sec, ms);
    }

    setDate(date: number): number {
        return super.setUTCDate(date);
    }

    setMonth(month: number, date?: number): number {
        return super.setUTCMonth(month, date);
    }

    setFullYear(year: number, month?: number, date?: number): number {
        return super.setUTCFullYear(year, month, date);
    }

    toDateString(): string {
        return new Intl.DateTimeFormat(undefined, {
            timeZone: "UTC",
            timeZoneName: undefined,
            hour: undefined,
            minute: undefined,
            second: undefined
        }).format(this);
    }

    toTimeString(): string {
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

    toString(): string {
        return new Intl.DateTimeFormat(undefined, {timeZone: "UTC", timeZoneName: undefined}).format(this);
    }

    toJSON(): any {
        return {"@type": LocalDate.jsonTypeName, date: super.toJSON()};
    }
}
