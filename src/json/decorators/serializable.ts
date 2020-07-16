import {Type} from "../../core";
import {getSupertypes} from "../getSupertypes";
import {InternalType} from "../InternalType";
import {JsonTypeName} from "../JsonTypeName";
import {setupSerialization} from "../setupSerialization";
import {TypeNameProvider, TypeProvider, TypeSerializerProvider} from "../TypeProvider";
import {PropertyConfig} from "./PropertyConfig";

export function serializable(options?: JsonSerializableOptions) {
    return function(classType: Type) {
        setupSerialization(classType);

        const classInternalType = classType as InternalType;

        if (options?.properties) {
            classInternalType.__jsonProperties = Object.assign(classInternalType.__jsonProperties || {}, options.properties);
        }

        if (options?.types) {
            classInternalType.__jsonTypes = classInternalType.__jsonTypes || [];

            for (const types of options.types) {
                for (const type of Array.isArray(types) ? types : [types]) {
                    if ((type as JsonTypeName).jsonTypeName) {
                        classInternalType.__jsonTypes.push({name: (type as JsonTypeName).jsonTypeName, type: type as Type});
                    } else {
                        classInternalType.__jsonTypes.push(type as TypeProvider);
                    }
                }
            }
        }

        if (classInternalType.jsonTypeName) {
            for (const supertype of getSupertypes(classInternalType)) {
                if (supertype.__jsonSerialization) {

                    const types = supertype.__jsonSubtypes = supertype.__jsonSubtypes || [];
                    types.push({
                        type: classType,
                        property: "@type",
                        value: classInternalType.jsonTypeName
                    });

                    break;
                }
            }
        }
    }
}

export interface JsonSerializableOptions {
    types?: Array<(Type & JsonTypeName) | TypeProvider | Array<(Type & JsonTypeName) | TypeProvider>>;
    properties?: {[propertyName: string]: PropertyConfig};
}
