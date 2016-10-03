import { Serializer, SerializationOptions } from "./serializer";
export declare class NumberSerializer extends Serializer {
    static readonly INSTANCE: NumberSerializer;
    serialize(value: any, options?: SerializationOptions): any;
    unserialize(value: any, options?: SerializationOptions): any;
}
