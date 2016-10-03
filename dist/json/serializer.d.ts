export interface SerializationOptions {
    notStrict?: boolean;
    disallowUndefinedOrNull?: boolean;
    ignoreErrors?: boolean;
    [propName: string]: any;
}
export declare abstract class Serializer {
    serialize(object: any, options?: SerializationOptions): any;
    abstract unserialize(json: any, options?: SerializationOptions): any;
    protected isUndefinedOrNull(value: any): boolean;
    protected serializeUndefinedOrNull(value: any, options?: SerializationOptions): any;
    protected unserializeUndefinedOrNull(value: any, options?: SerializationOptions): any;
}
