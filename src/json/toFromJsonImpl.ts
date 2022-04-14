import {AssignableType, resolveForwardRef, Type} from "../core";
import {PropertyConfig} from "./decorators/PropertyConfig";
import {findTypeSerializer} from "./findTypeSerializer";
import {getPrototypesTree} from "./getPrototypesTree";
import {identifyType} from "./identifyType";
import {InternalType} from "./InternalType";
import {serializeImpl} from "./serializeImpl";
import {Serializer} from "./Serializer";
import {ArraySerializer} from "./serializers";
import {unserializeImpl} from "./unserializeImpl";

export function toJsonImpl(this: any) {

    const prototypesTree = getPrototypesTree(this);
    const typesTree = getTypesTree(prototypesTree);
    const serializationOptions = {typeProviders: typesTree[0].__jsonTypes};

    let json: any = {};

    // call toJSON for super types, only if hard coded in a class
    for (let t = 1; t < typesTree.length; t++) {
        if (!typesTree[t].__jsonToJson && prototypesTree[t].hasOwnProperty("toJSON")) {

            const prototypeJson = prototypesTree[t].toJSON.call(this);
            if (prototypeJson && typeof prototypeJson === "object") {
                json = prototypeJson;
            }

            break;
        }
    }

    const properties = getDeclaredProperties(this, typesTree);

    for (const propertyName in properties) {
        const config = properties[propertyName] as PropertyConfig;
        const value = this[propertyName];

        if (value === undefined || typeof value === "function") {
            continue;
        }

        const name = config.propertyJsonName ? config.propertyJsonName : propertyName;

        if (Array.isArray(value)) {
            const serializer = config.propertyType instanceof Serializer ? config.propertyType : (config.propertyType && findTypeSerializer(config.propertyType, typesTree[0].__jsonTypes));

            if (serializer instanceof ArraySerializer) {
                json[name] = serializer.serialize(value, serializationOptions);
            } else {
                json[name] = [];
                for (const i of value) {
                    json[name].push(serializer ? serializer.serialize(i, serializationOptions) : serializeImpl(i, config.propertyType as Type<any>, serializationOptions));
                }
            }
        } else {
            const type = (config.propertyType || config.propertyDesignType) ?? identifyType(value);
            const serializer = config.propertyType instanceof Serializer ? config.propertyType : findTypeSerializer(type, typesTree[0].__jsonTypes);
            if (serializer) {
                json[name] = serializer.serialize(value, serializationOptions);
            } else {
                json[name] = serializeImpl(value, type, serializationOptions);
            }
        }
    }

    if (typesTree[0].hasOwnProperty("jsonTypeName")) {
        json["@type"] = (typesTree[0] as InternalType).jsonTypeName;
    }

    return json;
}

export function fromJsonImpl(this: AssignableType, json: any) {

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
                    return matchedType.fromJSON(json);
                }

                instance = new matchedType;
                break;
            }
        }
    }

    if (!instance) {
        instance = new this();
    }

    const prototypesTree = getPrototypesTree(instance);
    const typesTree = getTypesTree(prototypesTree);
    const serializationOptions = {typeProviders: typesTree[0].__jsonTypes};

    const properties = getDeclaredProperties(instance, typesTree);

    // property names that already unserialized
    const unserializedProperties: string[] = [];

    // unserialize known properties
    for (const propertyName in properties) {
        const config = properties[propertyName] as PropertyConfig;
        const name = config.propertyJsonName ? config.propertyJsonName : propertyName;

        if (name in json) {

            const value = json[name];
            if (typeof value === "function") {
                continue;
            }

            if (Array.isArray(value)) {
                const serializer = config.propertyType instanceof Serializer ? config.propertyType : (config.propertyType && findTypeSerializer(config.propertyType, typesTree[0].__jsonTypes));

                if (serializer instanceof ArraySerializer) {
                    instance[propertyName] = serializer.unserialize(value, serializationOptions);
                } else {
                    instance[propertyName] = [];
                    for (const i of value) {
                        instance[propertyName].push(serializer ? serializer.unserialize(i, serializationOptions) : unserializeImpl(i, config.propertyType as Type<any>, serializationOptions));
                    }
                }

            } else {
                const type = (config.propertyType || config.propertyDesignType) ?? identifyType(value);
                const serializer = config.propertyType instanceof Serializer ? config.propertyType : findTypeSerializer(type, typesTree[0].__jsonTypes);
                instance[propertyName] = serializer ? serializer.unserialize(value, serializationOptions) : unserializeImpl(value, type, serializationOptions);
            }

            unserializedProperties.push(name);
        }
    }

    // copy json properties, that were not unserialized above
    for (const propertyName in json) {

        if (propertyName === "@type" && (typesTree[0] as InternalType).jsonTypeName) {
            continue;
        }

        if (unserializedProperties.indexOf(propertyName) < 0) {
            instance[propertyName] = unserializeImpl(json[propertyName], null, serializationOptions);
        }
    }

    return instance;
}

function getTypesTree(prototypes: any[]): Array<Type & InternalType> {
    return prototypes.map(type => type.constructor);
}

function getDeclaredProperties(thiz: any, types: Type[]): {[propertyName: string]: PropertyConfig} {

    let properties: {[propertyName: string]: {}} = {};

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
