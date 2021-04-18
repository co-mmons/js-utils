
const offsetDateRegex = /(\d+).(\d+).(\d+),?\s+(\d+).(\d+)(.(\d+))?/;
const offsetFormatOptions = {timeZone: "UTC", hour12: false, year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric"};
const offsetUsFormatter = new Intl.DateTimeFormat("en-US", offsetFormatOptions);

export class TimeZoneDate extends Date {

    static readonly jsonTypeName = "TimeZoneDate";

    static timezoneOffset(timezone: string, date?: Date): number {

        if (!date) {
            date = new Date();
        }

        function parseDate(dateString: string) {
            dateString = dateString.replace(/[\u200E\u200F]/g, "");
            return [].slice.call(offsetDateRegex.exec(dateString), 1).map(Math.floor);
        }

        function diffMinutes(d1: number[], d2: number[]) {
            let day = d1[1] - d2[1];
            let hour = d1[3] - d2[3];
            let min = d1[4] - d2[4];

            if (day > 15) day = -1;
            if (day < -15) day = 1;

            return 60 * (24 * day + hour) + min;
        }

        const formatter = new Intl.DateTimeFormat("en-US", Object.assign({}, offsetFormatOptions, {timeZone: timezone}));

        return diffMinutes(
            parseDate(offsetUsFormatter.format(date)),
            parseDate(formatter.format(date))
        );
    }

    static fromJSON(json: any) {
        if (typeof json === "object" && json && json["timeZone"] && json["date"]) {
            return new TimeZoneDate(json["date"], json["timeZone"]);
        } else if (json instanceof Date) {
            return new TimeZoneDate(json);
        } else if (typeof json === "number") {
            return new TimeZoneDate(json);
        }
    }

    constructor();

    constructor(epoch: number, timeZone?: string);

    constructor(date: Date, timeZone?: string);

    constructor(isoDateString: string, timeZone?: string);

    constructor(dateOrEpoch?: Date | number | string, timeZone?: string) {

        if (dateOrEpoch !== undefined) {
            super(dateOrEpoch);
        }

        this.timeZone = timeZone;
    }

    timeZone: string;

    toJSON(): any {
        return {"@type": "TimeZoneDate", date: super.toJSON(), timeZone: this.timeZone};
    }
}