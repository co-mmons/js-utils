import { SerializationOptions } from "../SerializationOptions";
import { Serializer } from "../Serializer";
export declare class NumberSerializer extends Serializer {
    serialize(value: any, options?: SerializationOptions): any;
    unserialize(value: any, options?: SerializationOptions): any;
}
export declare namespace NumberSerializer {
    const instance: NumberSerializer;
}
