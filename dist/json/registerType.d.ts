import { Type } from "../core";
import { JsonTypeName } from "./JsonTypeName";
export declare function registerType(typeClass: Type & JsonTypeName, options?: {
    replace?: boolean;
}): any;
export declare function registerType(typeClass: Type, typeName: string, options?: {
    replace?: boolean;
}): any;
export interface RegisterTypeOptions {
    replace?: boolean;
}
