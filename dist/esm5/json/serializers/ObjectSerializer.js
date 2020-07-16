import { __extends } from "tslib";
import { findTypeOrSerializerByName } from "../findTypeOrSerializerByName";
import { findTypeSerializer } from "../findTypeSerializer";
import { identifyType } from "../identifyType";
import { Serializer } from "../Serializer";
var ObjectSerializer = /** @class */ (function (_super) {
    __extends(ObjectSerializer, _super);
    function ObjectSerializer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ObjectSerializer.prototype.serialize = function (object, options) {
        if (this.isUndefinedOrNull(object)) {
            return object;
        }
        else {
            var serializer = findTypeSerializer(identifyType(object));
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
        else if (typeof json !== "object") {
            var type = identifyType(json);
            if (type !== Object) {
                var serializer = findTypeSerializer(type);
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
            var typeOrSerializer = findTypeOrSerializerByName(json);
            if (typeOrSerializer instanceof Serializer) {
                return typeOrSerializer.unserialize(json, options);
            }
            else if (typeOrSerializer) {
                if (typeOrSerializer.prototype["fromJSON"]) {
                    var instance = Object.create(typeOrSerializer.prototype);
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
            var niu = {};
            for (var _i = 0, _a = Object.keys(json); _i < _a.length; _i++) {
                var property = _a[_i];
                niu[property] = this.unserialize(json[property]);
            }
            return niu;
        }
    };
    return ObjectSerializer;
}(Serializer));
export { ObjectSerializer };
(function (ObjectSerializer) {
    ObjectSerializer.instance = new ObjectSerializer();
})(ObjectSerializer || (ObjectSerializer = {}));
//# sourceMappingURL=ObjectSerializer.js.map