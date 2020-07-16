import { Type } from "../core";
import { JsonTypeName } from "./JsonTypeName";
export declare function registerGlobalProvider(typeClass: Type & JsonTypeName, options?: {
    replace?: boolean;
}): any;
export declare function registerGlobalProvider(typeClass: Type, typeName: string, options?: {
    replace?: boolean;
}): any;
export interface RegisterGlobalProviderOptions {
    replace?: boolean;
}
