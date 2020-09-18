export declare class HtmlString extends String {
    static readonly jsonTypeName = "HtmlString";
    static fromJSON(json: string | {
        "@type": "HtmlString";
        value: string;
    }): HtmlString;
    toJSON(): {
        "@type": string;
        value: string;
    };
}
