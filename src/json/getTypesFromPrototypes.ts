import {Type} from "../core";
import {InternalType} from "./InternalType";

export function getTypesFromPrototypes(prototypes: any[]): Array<Type & InternalType> {
    return prototypes.map(type => type.constructor);
}
