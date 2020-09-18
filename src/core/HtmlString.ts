export class HtmlString extends String {

    static readonly jsonTypeName = "HtmlString";

    static fromJSON(json: string | {"@type": "HtmlString", value: string}) {
        if (typeof json === "string") {
            return new HtmlString(json);
        } else if (typeof json === "object" && json["@type"] === HtmlString.jsonTypeName && typeof json === "string") {
            return new HtmlString(json["value"]);
        } else {
            throw new Error(`Cannot unserialize ${json} to HtmlString`);
        }
    }

    toJSON() {
        return {"@type": "HtmlString", value: super.toString()}
    }
}