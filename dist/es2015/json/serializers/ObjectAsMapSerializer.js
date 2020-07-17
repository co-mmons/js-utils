"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectAsMapSerializer = void 0;
const Serializer_1 = require("../Serializer");
const ObjectSerializer_1 = require("./ObjectSerializer");
/**
 * Serializer of objects, that should be treated as Maps, where key is always a string and value of given type.
 */
class ObjectAsMapSerializer extends Serializer_1.Serializer {
    constructor(valueTypeOrSerializer) {
        super();
        this.typeOrSerializer = valueTypeOrSerializer;
    }
    serialize(value, options) {
        if (this.isUndefinedOrNull(value)) {
            return this.serializeUndefinedOrNull(value, options);
        }
        else if (typeof value === "object") {
            const serializer = this.typeOrSerializer instanceof Serializer_1.Serializer ? this.typeOrSerializer : (this.typeOrSerializer && ObjectSerializer_1.ObjectSerializer.getTypeSerializer(this.typeOrSerializer, options === null || options === void 0 ? void 0 : options.typeProviders)) || ObjectSerializer_1.ObjectSerializer.instance;
            const json = {};
            for (const i in value) {
                json[i] = serializer.serialize(value[i], options);
            }
            return json;
        }
        else if (!options || !options.ignoreErrors) {
            throw new Error(`Cannot serialize "${value}" as object`);
        }
        else {
            return undefined;
        }
    }
    unserialize(value, options) {
        if (this.isUndefinedOrNull(value)) {
            return this.unserializeUndefinedOrNull(value, options);
        }
        else if (typeof value === "object") {
            const serializer = this.typeOrSerializer instanceof Serializer_1.Serializer ? this.typeOrSerializer : (this.typeOrSerializer && ObjectSerializer_1.ObjectSerializer.getTypeSerializer(this.typeOrSerializer, options === null || options === void 0 ? void 0 : options.typeProviders)) || ObjectSerializer_1.ObjectSerializer.instance;
            const object = {};
            for (const i in value) {
                object[i] = serializer.unserialize(value[i], options);
            }
            return object;
        }
        else if (!options || !options.ignoreErrors) {
            throw new Error(`Cannot unserialize "${value}" to object.`);
        }
        else {
            return undefined;
        }
    }
}
exports.ObjectAsMapSerializer = ObjectAsMapSerializer;
//# sourceMappingURL=ObjectAsMapSerializer.js.map