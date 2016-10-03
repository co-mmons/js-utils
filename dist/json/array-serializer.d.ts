import { Serializer, SerializationOptions } from "./serializer";
export declare class ArraySerializer extends Serializer {
    constructor(valueType?: Function | Serializer);
    private valueType;
    serialize(value: any, options?: SerializationOptions): any;
    unserialize(value: any, options?: SerializationOptions): any;
}
export declare const ArrayOfAny: ArraySerializer;
export declare const ArrayOfString: ArraySerializer;
export declare const ArrayOfNumber: ArraySerializer;
