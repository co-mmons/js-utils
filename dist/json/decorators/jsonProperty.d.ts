import { SerializationOptions } from "../SerializationOptions";
import { Serializer } from "../Serializer";
import "reflect-metadata";
export declare function jsonProperty(type?: Function | Serializer): Function;
export declare function jsonProperty(type: Function | Serializer, options?: SerializationOptions): Function;
export declare function jsonProperty(type: Function | Serializer, jsonName?: string): Function;
export declare function jsonProperty(type: Function | Serializer, jsonName: string, options?: SerializationOptions): Function;
export declare function jsonProperty(jsonName?: string): Function;
export declare function jsonProperty(jsonName: string, options?: SerializationOptions): Function;
