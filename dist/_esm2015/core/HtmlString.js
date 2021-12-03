export class HtmlString extends String {
    static fromJSON(json) {
        if (typeof json === "string") {
            return new HtmlString(json);
        }
        else if (typeof json === "object" && json["@type"] === HtmlString.jsonTypeName && typeof json["value"] === "string") {
            return new HtmlString(json["value"]);
        }
        else {
            throw new Error(`Cannot unserialize ${json} to HtmlString`);
        }
    }
    toJSON() {
        return { "@type": "HtmlString", value: super.toString() };
    }
    toString() {
        return super.toString();
    }
}
HtmlString.jsonTypeName = "HtmlString";
//# sourceMappingURL=HtmlString.js.map