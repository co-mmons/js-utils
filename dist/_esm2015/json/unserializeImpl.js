import { findTypeOrSerializerByName } from "./findTypeOrSerializerByName";
import { findTypeSerializer } from "./findTypeSerializer";
import { identifyType } from "./identifyType";
import { Serializer } from "./Serializer";
export function unserializeImpl(value, type, options) {
    return unserializeImplWithSerializer(value, type, null, options);
}
function unserializeImplWithSerializer(value, type, typeSerializer, options) {
    if (value === undefined || value === null) {
        return value;
    }
    const serializer = typeSerializer ? typeSerializer : (typeSerializer !== false && findTypeSerializer(type, options === null || options === void 0 ? void 0 : options.typeProviders));
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
        type = identifyType(value);
        if (type !== Object) {
            const serializer = findTypeSerializer(type, options === null || options === void 0 ? void 0 : options.typeProviders);
            if (serializer) {
                return serializer.unserialize(value, options);
            }
        }
        const namedTypeOrSerializer = findTypeOrSerializerByName(value, options === null || options === void 0 ? void 0 : options.typeProviders);
        if (namedTypeOrSerializer) {
            return unserializeImplWithSerializer(value, (namedTypeOrSerializer instanceof Serializer) ? null : namedTypeOrSerializer, namedTypeOrSerializer instanceof Serializer ? namedTypeOrSerializer : null, options);
        }
        const niu = {};
        for (const property of Object.keys(value)) {
            niu[property] = unserializeImpl(value[property], null, options);
        }
        return niu;
    }
}
//# sourceMappingURL=unserializeImpl.js.map