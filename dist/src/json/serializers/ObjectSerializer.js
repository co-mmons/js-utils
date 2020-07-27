"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectSerializer = void 0;
const findTypeOrSerializerByName_1 = require("../findTypeOrSerializerByName");
const findTypeSerializer_1 = require("../findTypeSerializer");
const identifyType_1 = require("../identifyType");
const Serializer_1 = require("../Serializer");
class ObjectSerializer extends Serializer_1.Serializer {
    constructor(type) {
        super();
        if (type && type !== Object) {
            this.type = type;
        }
    }
    serialize(object, options) {
        if (this.isUndefinedOrNull(object)) {
            return object;
        }
        else {
            const serializer = findTypeSerializer_1.findTypeSerializer(this.type ? this.type : identifyType_1.identifyType(object), options === null || options === void 0 ? void 0 : options.typeProviders);
            if (serializer && serializer !== this) {
                return serializer.serialize(object, options);
            }
            if (object.toJSON) {
                return object.toJSON();
            }
        }
        return object;
    }
    unserialize(json, options) {
        if (this.isUndefinedOrNull(json)) {
            return json;
        }
        if (this.type) {
            const serializer = findTypeSerializer_1.findTypeSerializer(this.type, options === null || options === void 0 ? void 0 : options.typeProviders);
            if (serializer) {
                return serializer.unserialize(json, options);
            }
            else {
                return this.unserializeToType(this.type, json);
            }
        }
        if (!this.type && (typeof json !== "object" || Array.isArray(json))) {
            const type = identifyType_1.identifyType(json);
            if (type !== Object) {
                const serializer = findTypeSerializer_1.findTypeSerializer(type, options === null || options === void 0 ? void 0 : options.typeProviders);
                if (serializer) {
                    return serializer.unserialize(json, options);
                }
                else {
                    return json;
                }
            }
            else {
                return json;
            }
        }
        else {
            const typeOrSerializer = findTypeOrSerializerByName_1.findTypeOrSerializerByName(json, options === null || options === void 0 ? void 0 : options.typeProviders);
            if (typeOrSerializer instanceof Serializer_1.Serializer) {
                return typeOrSerializer.unserialize(json, options);
            }
            else if (typeOrSerializer) {
                return this.unserializeToType(typeOrSerializer, json);
            }
            const niu = {};
            for (const property of Object.keys(json)) {
                niu[property] = this.unserialize(json[property], options);
            }
            return niu;
        }
    }
    unserializeToType(type, json) {
        if (type.prototype["fromJSON"]) {
            const instance = Object.create(type.prototype);
            instance.fromJSON(json);
            return instance;
        }
        else if (type["fromJSON"]) {
            return type["fromJSON"](json);
        }
        else if (type !== Object) {
            return new type(json);
        }
    }
}
exports.ObjectSerializer = ObjectSerializer;
(function (ObjectSerializer) {
    ObjectSerializer.instance = new ObjectSerializer();
    function getTypeSerializer(type, typeProviders) {
        const serializer = findTypeSerializer_1.findTypeSerializer(type, typeProviders);
        if (serializer) {
            return serializer;
        }
        else {
            return new ObjectSerializer(type);
        }
    }
    ObjectSerializer.getTypeSerializer = getTypeSerializer;
})(ObjectSerializer = exports.ObjectSerializer || (exports.ObjectSerializer = {}));
//# sourceMappingURL=ObjectSerializer.js.map