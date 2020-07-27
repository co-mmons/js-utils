import { SerializationOptions } from "../SerializationOptions";
import { Serializer } from "../Serializer";
import "reflect-metadata";
export declare function property(type?: Function | Serializer): Function;
export declare function property(type: Function | Serializer, options?: SerializationOptions): Function;
export declare function property(type: Function | Serializer, jsonName?: string): Function;
export declare function property(type: Function | Serializer, jsonName: string, options?: SerializationOptions): Function;
export declare function property(jsonName?: string): Function;
export declare function property(jsonName: string, options?: SerializationOptions): Function;
