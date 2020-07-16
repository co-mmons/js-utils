"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectSerializer = void 0;
const findTypeOrSerializerByName_1 = require("../findTypeOrSerializerByName");
const findTypeSerializer_1 = require("../findTypeSerializer");
const identifyType_1 = require("../identifyType");
const Serializer_1 = require("../Serializer");
class ObjectSerializer extends Serializer_1.Serializer {
    serialize(object, options) {
        if (this.isUndefinedOrNull(object)) {
            return object;
        }
        else {
            const serializer = findTypeSerializer_1.findTypeSerializer(identifyType_1.identifyType(object));
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
        else if (typeof json !== "object") {
            const type = identifyType_1.identifyType(json);
            if (type !== Object) {
                const serializer = findTypeSerializer_1.findTypeSerializer(type);
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
            const typeOrSerializer = findTypeOrSerializerByName_1.findTypeOrSerializerByName(json);
            if (typeOrSerializer instanceof Serializer_1.Serializer) {
                return typeOrSerializer.unserialize(json, options);
            }
            else if (typeOrSerializer) {
                if (typeOrSerializer.prototype["fromJSON"]) {
                    const instance = Object.create(typeOrSerializer.prototype);
                    instance.fromJSON(json);
                    return instance;
                }
                else if (typeOrSerializer["fromJSON"]) {
                    return typeOrSerializer["fromJSON"](json);
                }
                else if (typeOrSerializer !== Object) {
                    return new typeOrSerializer(json);
                }
            }
            const niu = {};
            for (const property of Object.keys(json)) {
                niu[property] = this.unserialize(json[property]);
            }
            return niu;
        }
    }
}
exports.ObjectSerializer = ObjectSerializer;
(function (ObjectSerializer) {
    ObjectSerializer.instance = new ObjectSerializer();
})(ObjectSerializer = exports.ObjectSerializer || (exports.ObjectSerializer = {}));
//# sourceMappingURL=ObjectSerializer.js.map