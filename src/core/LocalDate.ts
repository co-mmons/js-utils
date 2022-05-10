/**
 * A date, that points date-time always in local time.
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

    toJSON(): any {
        return {"@type": LocalDate.jsonTypeName, date: super.toJSON()};
    }
}
