export declare abstract class Serializer {
    serialize(object: any, options?: SerializationOptions): any;
    abstract unserialize(json: any, options?: SerializationOptions): any;
    protected isUndefinedOrNull(value: any): boolean;
    protected serializeUndefinedOrNull(value: any, options?: SerializationOptions): any;
    protected unserializeUndefinedOrNull(value: any, options?: SerializationOptions): any;
}
export interface SerializationOptions {
    notStrict?: boolean;
    disallowUndefinedOrNull?: boolean;
    ignoreErrors?: boolean;
    [propName: string]: any;
}
export declare function serialize(object: any): any;
export declare function unserialize<T>(json: any, targetClass: Function): T;
export declare function Property(type: Function | Serializer): Function;
export declare function Property(type: Function | Serializer, jsonName?: string): Function;
export declare function Property(type: Function | Serializer, options?: SerializationOptions): Function;
export declare function Property(type: Function | Serializer, jsonName: string, options?: SerializationOptions): Function;
export declare function Ignore(target: any, propertyName: string, propertyDescriptor?: PropertyDescriptor): void;
