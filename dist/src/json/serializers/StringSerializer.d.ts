import { SerializationOptions } from "../SerializationOptions";
import { Serializer } from "../Serializer";
export declare class StringSerializer extends Serializer {
    serialize(value: any, options?: SerializationOptions): any;
    unserialize(value: any, options?: SerializationOptions): any;
}
export declare namespace StringSerializer {
    const instance: StringSerializer;
}
