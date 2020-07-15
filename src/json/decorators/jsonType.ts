import {Type} from "../../core";
import {InternalType} from "../InternalType";
import {registerType} from "../registerType";
import {setupSerialization} from "../setupSerialization";

export function jsonType(name: string, options?: {replace?: boolean}) {
    return function (classType: Type) {
        registerType(classType, name, options);
        setupSerialization(classType);
        (classType as InternalType).__jsonTypeName = name;
    }
}
