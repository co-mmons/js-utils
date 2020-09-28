import { Type } from "../../core";
import { SerializationOptions } from "../SerializationOptions";
import { Serializer } from "../Serializer";
import { TypeProvider } from "../TypeProvider";
/**
 * Basic serializer.
 */
export declare class ObjectSerializer extends Serializer {
    constructor(type?: Type);
    private readonly type?;
    serialize(object: any, options?: SerializationOptions): any;
    unserialize(json: any, options?: SerializationOptions): any;
}
export declare namespace ObjectSerializer {
    const instance: ObjectSerializer;
    function getTypeSerializer(type: Type, typeProviders?: TypeProvider[]): Serializer<any>;
}
