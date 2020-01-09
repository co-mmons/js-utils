import { __extends } from "tslib";
import { serialize, Serializer, unserialize } from "./serialization";
/**
 * Serializer of objects, that should be treated as Maps, where key is always a string and value of given type.
 */
var ObjectAsMapSerializer = /** @class */ (function (_super) {
    __extends(ObjectAsMapSerializer, _super);
    function ObjectAsMapSerializer(valueType) {
        var _this = _super.call(this) || this;
        _this.valueType = valueType;
        return _this;
    }
    ObjectAsMapSerializer.prototype.serialize = function (value, options) {
        if (this.isUndefinedOrNull(value)) {
            return this.serializeUndefinedOrNull(value, options);
        }
        else if (typeof value === "object") {
            var json = {};
            for (var i in value) {
                json[i] = this.valueType instanceof Serializer ? this.valueType.serialize(value[i]) : serialize(value[i]);
            }
            return json;
        }
        else if (!options || !options.ignoreErrors) {
            throw 'Cannot serialize "' + value + " as object";
        }
        else {
            return undefined;
        }
    };
    ObjectAsMapSerializer.prototype.unserialize = function (value, options) {
        if (typeof value === "object") {
            if (this.valueType) {
                var object = {};
                for (var i in value) {
                    object[i] = this.valueType instanceof Serializer ? this.valueType.unserialize(value[i]) : unserialize(value[i], this.valueType);
                }
                return object;
            }
            else {
                return value;
            }
        }
        else if (this.isUndefinedOrNull(value)) {
            return this.unserializeUndefinedOrNull(value, options);
        }
        else if (!options || !options.ignoreErrors) {
            throw 'Cannot unserialize "' + value + " to object.";
        }
        else {
            return undefined;
        }
    };
    return ObjectAsMapSerializer;
}(Serializer));
export { ObjectAsMapSerializer };
//# sourceMappingURL=object-as-map-serializer.js.map