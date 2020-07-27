import {Type} from "../../core";
import {getSupertypes} from "../getSupertypes";
import {InternalType} from "../InternalType";
import {JsonTypeName} from "../JsonTypeName";
import {setupSerialization} from "../setupSerialization";
import {TypeProvider} from "../TypeProvider";
import {PropertyConfig} from "./PropertyConfig";

export function serializable(options?: JsonSerializableOptions) {

    // when TsTransformer used, there can be up to 2 arguments
    // second argument is default options map, so we have to marge it
    if (arguments.length === 2) {
        options = Object.assign({}, options);
        for (let i = arguments.length - 1; i >= 0; i--) {
            options.properties = Object.assign(arguments[1].properties, options.properties);
        }
    }

    return function(classType: Type) {
        setupSerialization(classType);

        const classInternalType = classType as InternalType;

        if (options?.properties) {
            classInternalType.__jsonProperties = Object.assign((classInternalType.hasOwnProperty("__jsonProperties") && classInternalType.__jsonProperties) || {}, typeof options.properties === "string" ? {"*": null} : options.properties);
        }

        if (options?.types) {
            classInternalType.__jsonTypes = (classInternalType.hasOwnProperty("__jsonTypes") && classInternalType.__jsonTypes) || [];

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

        if (classInternalType.hasOwnProperty("jsonTypeName") && classInternalType.jsonTypeName) {
            for (const supertype of getSupertypes(classInternalType)) {
                if (supertype.hasOwnProperty("__jsonSerialization") && supertype.__jsonSerialization) {

                    const types = supertype.__jsonSubtypes = (supertype.hasOwnProperty("__jsonSubtypes") && supertype.__jsonSubtypes) || [];
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

type Types = Array<TypeProvider | TypeProvider[] | (Type & JsonTypeName) | Types>;

type Properties = {[propertyName: string]: PropertyConfig};

export interface JsonSerializableOptions {
    types?: Types;
    properties?: Properties | "*";
}
