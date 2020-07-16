"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromJsonImpl = exports.toJsonImpl = void 0;
const core_1 = require("../core");
const getPrototypes_1 = require("./getPrototypes");
const getTypesFromPrototypes_1 = require("./getTypesFromPrototypes");
const serialization_1 = require("./serialization");
const Serializer_1 = require("./Serializer");
function toJsonImpl(options) {
    const prototypes = getPrototypes_1.getPrototypes(this);
    const types = getTypesFromPrototypes_1.getTypesFromPrototypes(prototypes);
    let json = {};
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
        const propertyConfig = properties[propertyName];
        const propertyValue = this[propertyName];
        const jsonName = propertyConfig.propertyJsonName ? propertyConfig.propertyJsonName : propertyName;
        const serializer = propertyConfig.propertyType instanceof Serializer_1.Serializer ? propertyConfig.propertyType : serialization_1.serializerForType(propertyConfig.propertyType);
        json[jsonName] = serializer.serialize(propertyValue, propertyConfig);
    }
    if (types[0].jsonTypeName) {
        json["@type"] = types[0].jsonTypeName;
    }
    return json;
}
exports.toJsonImpl = toJsonImpl;
function fromJsonImpl(json, options) {
    const internalType = this;
    let instance;
    if (!instance && internalType.__jsonSubtypes) {
        for (const subtype of internalType.__jsonSubtypes) {
            let matchedType;
            if (subtype.matcher) {
                const match = subtype.matcher(json);
                if (match) {
                    matchedType = core_1.resolveForwardRef(match);
                }
            }
            else if (subtype.property && ((typeof subtype.value === "function" && subtype.value(json[subtype.property])) || (typeof subtype.value !== "function" && json[subtype.property] === subtype.value))) {
                matchedType = core_1.resolveForwardRef(subtype.type);
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
    const prototypes = getPrototypes_1.getPrototypes(instance);
    const types = getTypesFromPrototypes_1.getTypesFromPrototypes(prototypes);
    const properties = getProperties(instance, types);
    for (const propertyName in properties) {
        const propertyConfig = properties[propertyName];
        const jsonName = propertyConfig.propertyJsonName ? propertyConfig.propertyJsonName : propertyName;
        const serializer = propertyConfig.propertyType instanceof Serializer_1.Serializer ? propertyConfig.propertyType : serialization_1.serializerForType(propertyConfig.propertyType);
        if (jsonName in json) {
            instance[propertyName] = serializer.unserialize(json[jsonName], propertyConfig);
        }
    }
    return instance;
}
exports.fromJsonImpl = fromJsonImpl;
function getProperties(thiz, types) {
    const names = Object.getOwnPropertyNames(thiz);
    let properties = {};
    for (const propertyName in thiz) {
        if (typeof thiz[propertyName] !== "function") {
            properties[propertyName] = {};
        }
    }
    for (let t = types.length - 1; t >= 0; t--) {
        const internalType = types[t];
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
//# sourceMappingURL=toFromJsonImpl.js.map