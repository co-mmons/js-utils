import { Type } from "../../core";
import { SerializationOptions } from "../SerializationOptions";
import { Serializer } from "../Serializer";
export declare class ArraySerializer<T> extends Serializer<T[]> {
    constructor(valueTypeOrSerializer?: Type<T> | Serializer<T>);
    private readonly typeOrSerializer;
    serialize(value: any, options?: SerializationOptions): any;
    unserialize(json: any, options?: SerializationOptions): any;
}
export declare namespace ArraySerializer {
    const ofAny: ArraySerializer<any>;
    const ofString: ArraySerializer<String>;
    const ofNumber: ArraySerializer<Number>;
    const ofBoolean: ArraySerializer<Boolean>;
}
