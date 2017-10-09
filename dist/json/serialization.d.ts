import { Type } from "../core";
export declare function serialize(object: any, options?: SerializationOptions): any;
export declare function unserialize<T>(json: any, targetClass: Type<any>, options?: SerializationOptions): T;
export declare function serializerForType(type: Type<any>): Serializer;
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
export declare class ArraySerializer extends Serializer {
    static readonly ofAny: ArraySerializer;
    static readonly ofString: ArraySerializer;
    static readonly ofNumber: ArraySerializer;
    static readonly ofBoolean: ArraySerializer;
    constructor(valueType?: Function | Serializer);
    private valueType;
    serialize(value: any, options?: SerializationOptions): any;
    unserialize(json: any, options?: SerializationOptions): any;
}
/**
 * @deprecated Use {@link ArraySerializer#ofAny}.
 */
export declare const ArrayOfAny: ArraySerializer;
/**
 * @deprecated Use {@link ArraySerializer#ofString}.
 */
export declare const ArrayOfString: ArraySerializer;
/**
 * @deprecated Use {@link ArraySerializer#ofNumber}.
 */
export declare const ArrayOfNumber: ArraySerializer;
/**
 * @deprecated Use {@link ArraySerializer#ofBoolean}.
 */
export declare const ArrayOfBoolean: ArraySerializer;
