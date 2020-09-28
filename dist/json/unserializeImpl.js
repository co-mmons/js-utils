"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unserializeImpl = void 0;
const findTypeOrSerializerByName_1 = require("./findTypeOrSerializerByName");
const findTypeSerializer_1 = require("./findTypeSerializer");
const identifyType_1 = require("./identifyType");
const Serializer_1 = require("./Serializer");
function unserializeImpl(value, typeOrSerializer, options) {
    var _a, _b;
    if (value === undefined || value === null) {
        return value;
    }
    const serializer = typeOrSerializer instanceof Serializer_1.Serializer ? typeOrSerializer : findTypeSerializer_1.findTypeSerializer(typeOrSerializer, options === null || options === void 0 ? void 0 : options.typeProviders);
    if (Array.isArray(value)) {
        const array = [];
        for (const i of value) {
            array.push(unserializeImpl(i, serializer, options));
        }
        return array;
    }
    if (serializer) {
        return serializer.unserialize(value, options);
    }
    else if ((_a = typeOrSerializer) === null || _a === void 0 ? void 0 : _a.fromJSON) {
        return typeOrSerializer.fromJSON(value, options);
    }
    else if ((_b = typeOrSerializer) === null || _b === void 0 ? void 0 : _b.prototype["fromJSON"]) {
        const unserialized = Object.create(typeOrSerializer.prototype);
        unserialized.fromJSON(value, options);
        return unserialized;
    }
    else if (typeOrSerializer && typeOrSerializer !== Object) {
        return new typeOrSerializer(value);
    }
    else {
        const type = identifyType_1.identifyType(value);
        if (type !== Object) {
            const serializer = findTypeSerializer_1.findTypeSerializer(type, options === null || options === void 0 ? void 0 : options.typeProviders);
            if (serializer) {
                return serializer.unserialize(value, options);
            }
        }
        const namedTypeOrSerializer = findTypeOrSerializerByName_1.findTypeOrSerializerByName(value, options === null || options === void 0 ? void 0 : options.typeProviders);
        if (namedTypeOrSerializer) {
            return unserializeImpl(value, namedTypeOrSerializer, options);
        }
        const niu = {};
        for (const property of Object.keys(value)) {
            niu[property] = unserializeImpl(value[property], null, options);
        }
        return niu;
    }
}
exports.unserializeImpl = unserializeImpl;
//# sourceMappingURL=unserializeImpl.js.map