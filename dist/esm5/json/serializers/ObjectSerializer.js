import { __extends } from "tslib";
import { findTypeOrSerializerByName } from "../findTypeOrSerializerByName";
import { findTypeSerializer } from "../findTypeSerializer";
import { identifyType } from "../identifyType";
import { Serializer } from "../Serializer";
var ObjectSerializer = /** @class */ (function (_super) {
    __extends(ObjectSerializer, _super);
    function ObjectSerializer(type) {
        var _this = _super.call(this) || this;
        if (type && type !== Object) {
            _this.type = type;
        }
        return _this;
    }
    ObjectSerializer.prototype.serialize = function (object, options) {
        if (this.isUndefinedOrNull(object)) {
            return object;
        }
        else {
            var serializer = findTypeSerializer(this.type ? this.type : identifyType(object), options === null || options === void 0 ? void 0 : options.typeProviders);
            if (serializer && serializer !== this) {
                return serializer.serialize(object, options);
            }
            if (object.toJSON) {
                return object.toJSON();
            }
        }
        return object;
    };
    ObjectSerializer.prototype.unserialize = function (json, options) {
        if (this.isUndefinedOrNull(json)) {
            return json;
        }
        if (this.type) {
            var serializer = findTypeSerializer(this.type, options === null || options === void 0 ? void 0 : options.typeProviders);
            if (serializer) {
                return serializer.unserialize(json, options);
            }
            else {
                return this.unserializeToType(this.type, json);
            }
        }
        if (!this.type && typeof json !== "object") {
            var type = identifyType(json);
            if (type !== Object) {
                var serializer = findTypeSerializer(type, options === null || options === void 0 ? void 0 : options.typeProviders);
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
            var typeOrSerializer = findTypeOrSerializerByName(json, options === null || options === void 0 ? void 0 : options.typeProviders);
            if (typeOrSerializer instanceof Serializer) {
                return typeOrSerializer.unserialize(json, options);
            }
            else if (typeOrSerializer) {
                return this.unserializeToType(typeOrSerializer, json);
            }
            var niu = {};
            for (var _i = 0, _a = Object.keys(json); _i < _a.length; _i++) {
                var property = _a[_i];
                niu[property] = this.unserialize(json[property], options);
            }
            return niu;
        }
    };
    ObjectSerializer.prototype.unserializeToType = function (type, json) {
        if (type.prototype["fromJSON"]) {
            var instance = Object.create(type.prototype);
            instance.fromJSON(json);
            return instance;
        }
        else if (type["fromJSON"]) {
            return type["fromJSON"](json);
        }
        else if (type !== Object) {
            return new type(json);
        }
    };
    return ObjectSerializer;
}(Serializer));
export { ObjectSerializer };
(function (ObjectSerializer) {
    ObjectSerializer.instance = new ObjectSerializer();
    function getTypeSerializer(type, typeProviders) {
        var serializer = findTypeSerializer(type, typeProviders);
        if (serializer) {
            return serializer;
        }
        else {
            return new ObjectSerializer(type);
        }
    }
    ObjectSerializer.getTypeSerializer = getTypeSerializer;
})(ObjectSerializer || (ObjectSerializer = {}));
//# sourceMappingURL=ObjectSerializer.js.map