import { Serializer, SerializationOptions } from "./index";
export declare class BooleanSerializer extends Serializer {
    static readonly INSTANCE: BooleanSerializer;
    serialize(value: any, options?: SerializationOptions): any;
    unserialize(value: any, options?: SerializationOptions): any;
}
