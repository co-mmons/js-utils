import { Type } from "../core";
import { SerializationOptions } from "./SerializationOptions";
import { Serializer } from "./Serializer";
export declare function serialize(object: any, options?: SerializationOptions): any;
export declare function unserialize<T>(json: any, targetClass?: Type, options?: SerializationOptions): T;
export declare function serializerForType(type: Type): Serializer;
export declare class ArraySerializer<T> extends Serializer<T[]> {
    static readonly ofAny: ArraySerializer<any>;
    static readonly ofString: ArraySerializer<String>;
    static readonly ofNumber: ArraySerializer<Number>;
    static readonly ofBoolean: ArraySerializer<Boolean>;
    constructor(valueType?: Type<T> | Serializer<T>);
    private valueType;
    serialize(value: any, options?: SerializationOptions): any;
    unserialize(json: any, options?: SerializationOptions): any;
}
