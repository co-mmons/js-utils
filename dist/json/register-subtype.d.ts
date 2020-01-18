import { ForwardRefFn, Type } from "../core";
import { SubtypeMatcher } from "./decorators";
export declare function registerSubtype(clazz: Type<any>, matcher: SubtypeMatcher): any;
export declare function registerSubtype(clazz: Type<any>, property: string, value: (value: any) => boolean | any, type: ForwardRefFn | Type<any>): any;
