import { Enum } from "../../core";
import { SerializationOptions } from "../SerializationOptions";
import { Serializer } from "../Serializer";
/**
 * Serializes enum as a string. By default native enums are serialized as numbers, @{link Enum} is serialized to types json.
 */
export declare class EnumAsStringSerializer extends Serializer {
    constructor(enumClass: Enum | any);
    private readonly enumClass;
    serialize(value: any, options?: SerializationOptions): any;
    unserialize(value: any, options?: SerializationOptions): any;
}
