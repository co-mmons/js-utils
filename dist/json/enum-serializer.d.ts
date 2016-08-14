import { Serializer, SerializationOptions } from "./index";
export declare class EnumAsStringSerializer extends Serializer {
    constructor(enumClass: any);
    private enumClass;
    serialize(value: any, options?: SerializationOptions): any;
    unserialize(value: any, options?: SerializationOptions): any;
}
