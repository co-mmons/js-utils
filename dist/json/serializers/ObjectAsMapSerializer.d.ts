import { Type } from "../../core";
import { SerializationOptions } from "../SerializationOptions";
import { Serializer } from "../Serializer";
/**
 * Serializer of objects, that should be treated as Maps, where key is always a string and value of given type.
 */
export declare class ObjectAsMapSerializer extends Serializer {
    constructor(valueTypeOrSerializer?: Type | Serializer);
    private readonly typeOrSerializer;
    serialize(value: any, options?: SerializationOptions): any;
    unserialize(value: any, options?: SerializationOptions): any;
}
