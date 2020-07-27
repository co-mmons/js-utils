import { SerializationOptions } from "../SerializationOptions";
import { Serializer } from "../Serializer";
export declare class BooleanSerializer extends Serializer {
    serialize(value: any, options?: SerializationOptions): any;
    unserialize(value: any, options?: SerializationOptions): any;
}
export declare namespace BooleanSerializer {
    const instance: BooleanSerializer;
}
