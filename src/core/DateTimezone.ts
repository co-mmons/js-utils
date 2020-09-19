
const offsetDateRegex = /(\d+).(\d+).(\d+),?\s+(\d+).(\d+)(.(\d+))?/;
const offsetFormatOptions = {timeZone: "UTC", hour12: false, year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric"};
const offsetUsFormatter = new Intl.DateTimeFormat("en-US", offsetFormatOptions);

export class DateTimezone {

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
        if (typeof json === "object" && json && json["timezone"] && json["date"]) {
            return new DateTimezone(json["date"], json["timezone"]);
        } else if (typeof json === "number") {
            return new DateTimezone(json);
        }
    }

    constructor(epoch: number, timezone?: string);

    constructor(date: Date, timezone?: string);

    constructor(dateOrEpoch: Date | number, timezone?: string) {

        this.timezone = timezone;

        if (typeof dateOrEpoch === "number") {
            this.date = new Date(dateOrEpoch);
        } else if (dateOrEpoch instanceof Date) {
            this.date = new Date(dateOrEpoch.getTime());
        }

    }

    readonly date: Date;

    readonly timezone: string;

    epoch() {
        return this.date.valueOf();
    }

    toJSON() {
        return {"@type": "intl/DateTimezone", date: this.date.getTime(), timezone: this.timezone};
    }
}
