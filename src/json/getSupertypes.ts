import {Type} from "../core";
import {getPrototypesTree} from "./getPrototypesTree";
import {InternalType} from "./InternalType";

export function getSupertypes(type: Type): Array<Type & InternalType> {
    return getPrototypesTree(type.prototype).map(type => type.constructor);
}
