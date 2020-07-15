import {Type} from "../../core";
import {getSupertypes} from "../getSupertypes";
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

        if (type.jsonTypeName) {
            for (const supertype of getSupertypes(type)) {
                if (supertype.__jsonSerialization) {

                    const types = supertype.__jsonSubtypes = supertype.__jsonSubtypes || [];
                    types.push({
                        type: classType,
                        property: "@type",
                        value: type.jsonTypeName
                    });

                    break;
                }
            }
        }
    }
}

export interface JsonSerializableOptions {
    types?: Array<Type & JsonTypeName>;
    properties?: {[propertyName: string]: PropertyConfig};
}
