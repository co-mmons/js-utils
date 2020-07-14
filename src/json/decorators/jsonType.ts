import {Type} from "../../core";
import {InternalType} from "../InternalType";
import {registerType} from "../registerType";

export function jsonType(name: string, options?: {replace?: boolean}) {
    return function (classType: Type) {
        registerType(name, classType, options);
        (classType as InternalType).__jsonTypeName = name;
    }
}
