"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unserializeImpl = void 0;
const findTypeOrSerializerByName_1 = require("./findTypeOrSerializerByName");
const findTypeSerializer_1 = require("./findTypeSerializer");
const identifyType_1 = require("./identifyType");
const Serializer_1 = require("./Serializer");
function unserializeImpl(value, type, options) {
    return unserializeImplWithSerializer(value, type, null, options);
}
exports.unserializeImpl = unserializeImpl;
function unserializeImplWithSerializer(value, type, typeSerializer, options) {
    if (value === undefined || value === null) {
        return value;
    }
    const serializer = typeSerializer ? typeSerializer : (typeSerializer !== false && (0, findTypeSerializer_1.findTypeSerializer)(type, options === null || options === void 0 ? void 0 : options.typeProviders));
    if (Array.isArray(value)) {
        const array = [];
        for (const i of value) {
            array.push(unserializeImplWithSerializer(i, type, serializer || false, options));
        }
        return array;
    }
    if (serializer) {
        return serializer.unserialize(value, options);
    }
    else if (type === null || type === void 0 ? void 0 : type.fromJSON) {
        return type.fromJSON(value, options);
    }
    else if (type === null || type === void 0 ? void 0 : type.prototype["fromJSON"]) {
        const unserialized = Object.create(type.prototype);
        unserialized.fromJSON(value, options);
        return unserialized;
    }
    else if (type && type !== Object && type !== Array) {
        return new type(value);
    }
    else {
        type = (0, identifyType_1.identifyType)(value);
        if (type !== Object) {
            const serializer = (0, findTypeSerializer_1.findTypeSerializer)(type, options === null || options === void 0 ? void 0 : options.typeProviders);
            if (serializer) {
                return serializer.unserialize(value, options);
            }
        }
        const namedTypeOrSerializer = (0, findTypeOrSerializerByName_1.findTypeOrSerializerByName)(value, options === null || options === void 0 ? void 0 : options.typeProviders);
        if (namedTypeOrSerializer) {
            return unserializeImplWithSerializer(value, (namedTypeOrSerializer instanceof Serializer_1.Serializer) ? null : namedTypeOrSerializer, namedTypeOrSerializer instanceof Serializer_1.Serializer ? namedTypeOrSerializer : null, options);
        }
        const niu = {};
        for (const property of Object.keys(value)) {
            niu[property] = unserializeImpl(value[property], null, options);
        }
        return niu;
    }
}
//# sourceMappingURL=unserializeImpl.js.map