export declare class JsonSerializer {
    serialize(object: any): any;
}
export interface JsonPropertyConfig {
    name?: string;
    serializer?: JsonSerializer;
}
export declare function JsonProperty(): any;
export declare function JsonProperty(jsonConfig: JsonPropertyConfig): any;
export declare function JsonProperty(jsonName: string): any;
export declare function JsonIgnore(target: any, propertyName: string, propertyDescriptor?: PropertyDescriptor): void;
export * from "./json-serializers";
