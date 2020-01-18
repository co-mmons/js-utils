import { ForwardRefFn, Type } from "../core";
import { SerializationOptions, Serializer } from "./serialization";
export declare function setupSerialization(constructor: any): void;
export declare type SubtypeMatcher = (json: any) => Type<any> | ForwardRefFn;
export interface SubtypeInfo {
    matcher?: SubtypeMatcher;
    property?: string;
    value?: (value: any) => boolean | any;
    type?: ForwardRefFn | Type<any>;
}
export declare function Subtype(matcher: SubtypeMatcher): any;
export declare function Subtype(property: string, value: any, typeRef: ForwardRefFn | Type<any>): any;
export declare function Subtypes(matcher: SubtypeMatcher): any;
export declare function Subtypes(types: SubtypeInfo[]): any;
export declare function Property(type: Function | Serializer): Function;
export declare function Property(type: Function | Serializer, jsonName?: string): Function;
export declare function Property(type: Function | Serializer, options?: SerializationOptions): Function;
export declare function Property(type: Function | Serializer, jsonName: string, options?: SerializationOptions): Function;
export declare function Ignore(target: any, propertyName: string, propertyDescriptor?: PropertyDescriptor): void;
/**
 * Marks a class, that is to be serialized by json serialization engine.
 */
export declare function Serialize(target: Function): void;
