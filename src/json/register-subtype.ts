import {ForwardRefFn, Type} from "../core";
import {setupSerialization, SubtypeInfo, SubtypeMatcher} from "./decorators";

export function registerSubtype(clazz: Type<any>, matcher: SubtypeMatcher);

export function registerSubtype(clazz: Type<any>, property: string, value: (value: any) => boolean | any, type: ForwardRefFn | Type<any>)

export function registerSubtype(clazz: Type<any>, matcherOrProperty: SubtypeMatcher | string, value?: (value: any) => boolean | any, type?: ForwardRefFn | Type<any>) {

    setupSerialization(clazz);

    let types: SubtypeInfo[];

    if (clazz.hasOwnProperty("__json__subtypes")) {
        types = Object.getOwnPropertyDescriptor(clazz, "__json__subtypes").value as SubtypeInfo[];
    } else {
        types = [];
        Object.defineProperty(clazz, "__json__subtypes", { value: types, enumerable: false, configurable: false });
    }

    types.push({
        property: typeof matcherOrProperty === "string" ? matcherOrProperty : undefined,
        value: value,
        type: type,
        matcher: typeof matcherOrProperty === "function" ? matcherOrProperty : undefined
    });
}
