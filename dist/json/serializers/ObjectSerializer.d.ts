import { SerializationOptions } from "../SerializationOptions";
import { Serializer } from "../Serializer";
export declare class ObjectSerializer extends Serializer {
    serialize(object: any, options?: SerializationOptions): any;
    unserialize(json: any, options?: SerializationOptions): any;
}
export declare namespace ObjectSerializer {
    const instance: ObjectSerializer;
}
