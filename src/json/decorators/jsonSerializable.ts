import {Type} from "../../core";
import {InternalType} from "../InternalType";
import {JsonTypeName} from "../JsonTypeName";
import {registerType} from "../registerType";
import {PropertyConfig} from "./PropertyConfig";
import {setupSerialization} from "../setupSerialization";

export function jsonSerializable(options?: JsonSerializableOptions) {
    return function(classType: Type) {
        setupSerialization(classType);

        const type = classType as InternalType;

        if (options?.properties) {
            const properties = type.__jsonProperties = Object.assign(type.__jsonProperties || {}, options.properties);
        }

        if (options?.types) {
            for (const typ of options.types) {
                registerType(typ);
            }
        }

    }
}

export interface JsonSerializableOptions {
    types?: Array<Type & JsonTypeName>;
    properties?: {[propertyName: string]: PropertyConfig};
}
