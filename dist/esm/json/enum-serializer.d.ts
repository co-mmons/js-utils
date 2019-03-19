import { SerializationOptions, Serializer } from "./serialization";
/**
 * Serializes enum as a String. By default enums are serialized as numbers.
 */
export declare class EnumAsStringSerializer extends Serializer {
    constructor(enumClass: any);
    private enumClass;
    serialize(value: any, options?: SerializationOptions): any;
    unserialize(value: any, options?: SerializationOptions): any;
}
