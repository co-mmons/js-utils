import {AssignableType, resolveForwardRef, Type} from "../core";
import {PropertyConfig} from "./decorators/PropertyConfig";
import {getPrototypes} from "./getPrototypes";
import {getTypesFromPrototypes} from "./getTypesFromPrototypes";
import {InternalType} from "./InternalType";
import {serializerForType} from "./serialization";
import {SerializationOptions} from "./SerializationOptions";
import {Serializer} from "./Serializer";

export function toJsonImpl(this: any, options?: SerializationOptions) {

    const prototypes = getPrototypes(this);
    const types = getTypesFromPrototypes(prototypes);

    let json: any = {};

    // call toJSON for super types, only if hard coded in a class
    for (let t = 1; t < types.length; t++) {
        if (!types[t].__jsonToJson && prototypes[t].hasOwnProperty("toJSON")) {

            const prototypeJson = prototypes[t].toJSON.call(this, options);
            if (prototypeJson && typeof prototypeJson === "object") {
                json = prototypeJson;
            }

            break;
        }
    }

    const properties = getProperties(this, types);

    for (const propertyName in properties) {
        const propertyConfig = properties[propertyName] as PropertyConfig;
        const propertyValue = this[propertyName];
        const jsonName = propertyConfig.propertyJsonName ? propertyConfig.propertyJsonName : propertyName;
        const serializer = propertyConfig.propertyType instanceof Serializer ? propertyConfig.propertyType as Serializer : serializerForType(propertyConfig.propertyType as Type<any>);
        json[jsonName] = serializer.serialize(propertyValue, propertyConfig);
    }

    if ((types[0] as InternalType).jsonTypeName) {
        json["@type"] = (types[0] as InternalType).jsonTypeName;
    }

    return json;
}

export function fromJsonImpl(this: AssignableType, json: any, options?: SerializationOptions) {

    const internalType = this as InternalType;

    let instance: any;

    if (!instance && internalType.__jsonSubtypes) {
        for (const subtype of internalType.__jsonSubtypes) {

            let matchedType: InternalType & AssignableType;

            if (subtype.matcher) {

                const match = subtype.matcher(json);
                if (match) {
                    matchedType = resolveForwardRef(match);
                }

            } else if (subtype.property && ((typeof subtype.value === "function" && subtype.value(json[subtype.property])) || (typeof subtype.value !== "function" && json[subtype.property] === subtype.value))) {
                matchedType = resolveForwardRef(subtype.type);
            }

            if (matchedType && matchedType !== this) {

                if (matchedType.hasOwnProperty("fromJSON")) {
                    return matchedType.fromJSON(json, options);
                }

                instance = new matchedType;
                break;
            }
        }
    }

    if (!instance) {
        instance = new this();
    }

    const prototypes = getPrototypes(instance);
    const types = getTypesFromPrototypes(prototypes);

    const properties = getProperties(instance, types);

    for (const propertyName in properties) {
        const propertyConfig = properties[propertyName] as PropertyConfig;
        const jsonName = propertyConfig.propertyJsonName ? propertyConfig.propertyJsonName : propertyName;
        const serializer = propertyConfig.propertyType instanceof Serializer ? propertyConfig.propertyType as Serializer : serializerForType(propertyConfig.propertyType);

        if (jsonName in json) {
            instance[propertyName] = serializer.unserialize(json[jsonName], propertyConfig);
        }
    }

    return instance;
}

function getProperties(thiz: any, types: Type[]): {[propertyName: string]: {}} {

    const names = Object.getOwnPropertyNames(thiz);

    let properties: {[propertyName: string]: {}} = {};

    for (const propertyName in thiz) {
        if (typeof thiz[propertyName] !== "function") {
            properties[propertyName] = {};
        }
    }

    for (let t = types.length - 1; t >= 0; t--) {
        const internalType = types[t] as InternalType;

        if (internalType.__jsonSerialization) {

            if (internalType.__jsonProperties) {
                properties = Object.assign(properties, internalType.__jsonProperties);
            }

            if (internalType.__jsonIgnoredProperties) {
                for (const propertyName of internalType.__jsonIgnoredProperties) {
                    delete properties[propertyName];
                }
            }
        }
    }

    return properties;
}
