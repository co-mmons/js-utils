import { SerializationOptions } from "../SerializationOptions";
import { Serializer } from "../Serializer";
/**
 * Serializes enum as a String. By default enums are serialized as numbers.
 */
export declare class EnumAsStringSerializer extends Serializer {
    constructor(enumClass: any);
    private readonly enumClass;
    serialize(value: any, options?: SerializationOptions): any;
    unserialize(value: any, options?: SerializationOptions): any;
}
