import { Serializer, SerializationOptions } from "./index";
/**
 * Serializes enum as a String. By default enums are serialized as numbers.
 */
export declare class EnumAsStringJsonSerializer extends Serializer {
    constructor(enumClass: any);
    private enumClass;
    serialize(value: any, options?: SerializationOptions): any;
    unserialize(value: any, options?: SerializationOptions): any;
}
