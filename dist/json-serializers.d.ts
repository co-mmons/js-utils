import { JsonSerializer } from "./json";
/**
 * Serializes enum as a String. By default enums are serialized as numbers.
 */
export declare class EnumAsStringSerializer extends JsonSerializer {
    constructor(enumClass: any);
    private enumClass;
    serialize(enumValue: any): any;
}
