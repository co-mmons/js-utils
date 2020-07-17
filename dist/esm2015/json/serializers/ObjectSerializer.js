import { findTypeOrSerializerByName } from "../findTypeOrSerializerByName";
import { findTypeSerializer } from "../findTypeSerializer";
import { identifyType } from "../identifyType";
import { Serializer } from "../Serializer";
export class ObjectSerializer extends Serializer {
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
            const serializer = findTypeSerializer(this.type ? this.type : identifyType(object), options === null || options === void 0 ? void 0 : options.typeProviders);
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
            const serializer = findTypeSerializer(this.type, options === null || options === void 0 ? void 0 : options.typeProviders);
            if (serializer) {
                return serializer.unserialize(json, options);
            }
            else {
                return this.unserializeToType(this.type, json);
            }
        }
        if (!this.type && typeof json !== "object") {
            const type = identifyType(json);
            if (type !== Object) {
                const serializer = findTypeSerializer(type, options === null || options === void 0 ? void 0 : options.typeProviders);
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
            const typeOrSerializer = findTypeOrSerializerByName(json, options === null || options === void 0 ? void 0 : options.typeProviders);
            if (typeOrSerializer instanceof Serializer) {
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
(function (ObjectSerializer) {
    ObjectSerializer.instance = new ObjectSerializer();
})(ObjectSerializer || (ObjectSerializer = {}));
//# sourceMappingURL=ObjectSerializer.js.map