import {Type} from "../core";
import {getPrototypes} from "./getPrototypes";
import {InternalType} from "./InternalType";

export function getSupertypes(type: Type): Array<Type & InternalType> {
    return getPrototypes(type.prototype).map(type => type.constructor);
}
