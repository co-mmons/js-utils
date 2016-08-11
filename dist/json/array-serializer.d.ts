import { Serializer, SerializationOptions } from "./index";
export declare class ArraySerializer extends Serializer {
    static INSTANCE: ArraySerializer;
    constructor(valueType?: Function | Serializer);
    serialize(value: any, options?: SerializationOptions): any;
    unserialize(value: any, options?: SerializationOptions): any;
}
export declare const ArrayOfString: ArraySerializer;
export declare const ArrayOfNumber: ArraySerializer;
