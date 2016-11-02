import { Serializer, SerializationOptions } from "./serializer";
/**
 * Serializer of objects, that should be treated as Maps, where key is always a string and value of given type.
 */
export declare class ObjectAsMapSerializer extends Serializer {
    constructor(valueType?: Function | Serializer);
    private valueType;
    serialize(value: any, options?: SerializationOptions): any;
    unserialize(value: any, options?: SerializationOptions): any;
}
