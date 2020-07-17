import { Type } from "../../core";
import { SerializationOptions } from "../SerializationOptions";
import { Serializer } from "../Serializer";
export declare class ObjectSerializer extends Serializer {
    constructor(type?: Type);
    private readonly type?;
    serialize(object: any, options?: SerializationOptions): any;
    unserialize(json: any, options?: SerializationOptions): any;
    private unserializeToType;
}
export declare namespace ObjectSerializer {
    const instance: ObjectSerializer;
}
