import { Serializer, SerializationOptions } from "./serializer";
export declare class ObjectAsMapSerializer extends Serializer {
    constructor(valueType?: Function | Serializer);
    private valueType;
    serialize(value: any, options?: SerializationOptions): any;
    unserialize(value: any, options?: SerializationOptions): any;
}
