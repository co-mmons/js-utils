/**
 * A date, that points to absolute date - no time, no time zone, just year-month-date.
 */
export class NoTimeDate extends Date {

    static readonly jsonTypeName = "NoTimeDate";

    static fromJSON(json: any) {
        if (typeof json === "object" && json && json["date"]) {
            return new NoTimeDate(json["date"]);
        } else if (json instanceof Date || typeof json === "number") {
            const d = new NoTimeDate(json);
            d.setUTCHours(0, 0, 0, 0);
            return d;
        }
    }

    toJSON(): any {
        return {"@type": NoTimeDate.jsonTypeName, date: super.toJSON()};
    }
}
