import { Type } from "../core";
export declare function registerType(typeClass: Type & {
    jsonTypeName: string;
}, options?: {
    replace?: boolean;
}): any;
export declare function registerType(typeClass: Type, typeName: string, options?: {
    replace?: boolean;
}): any;
