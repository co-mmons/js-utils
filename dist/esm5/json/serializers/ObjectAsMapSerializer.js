import { __extends } from "tslib";
import { Serializer } from "../Serializer";
import { ObjectSerializer } from "./ObjectSerializer";
/**
 * Serializer of objects, that should be treated as Maps, where key is always a string and value of given type.
 */
var ObjectAsMapSerializer = /** @class */ (function (_super) {
    __extends(ObjectAsMapSerializer, _super);
    function ObjectAsMapSerializer(valueTypeOrSerializer) {
        var _this = _super.call(this) || this;
        _this.typeOrSerializer = valueTypeOrSerializer;
        return _this;
    }
    ObjectAsMapSerializer.prototype.serialize = function (value, options) {
        if (this.isUndefinedOrNull(value)) {
            return this.serializeUndefinedOrNull(value, options);
        }
        else if (typeof value === "object") {
            var serializer = this.typeOrSerializer instanceof Serializer ? this.typeOrSerializer : (this.typeOrSerializer && ObjectSerializer.getTypeSerializer(this.typeOrSerializer, options === null || options === void 0 ? void 0 : options.typeProviders)) || ObjectSerializer.instance;
            var json = {};
            for (var i in value) {
                json[i] = serializer.serialize(value[i], options);
            }
            return json;
        }
        else if (!options || !options.ignoreErrors) {
            throw new Error("Cannot serialize \"" + value + "\" as object");
        }
        else {
            return undefined;
        }
    };
    ObjectAsMapSerializer.prototype.unserialize = function (value, options) {
        if (this.isUndefinedOrNull(value)) {
            return this.unserializeUndefinedOrNull(value, options);
        }
        else if (typeof value === "object") {
            var serializer = this.typeOrSerializer instanceof Serializer ? this.typeOrSerializer : (this.typeOrSerializer && ObjectSerializer.getTypeSerializer(this.typeOrSerializer, options === null || options === void 0 ? void 0 : options.typeProviders)) || ObjectSerializer.instance;
            var object = {};
            for (var i in value) {
                object[i] = serializer.unserialize(value[i], options);
            }
            return object;
        }
        else if (!options || !options.ignoreErrors) {
            throw new Error("Cannot unserialize \"" + value + "\" to object.");
        }
        else {
            return undefined;
        }
    };
    return ObjectAsMapSerializer;
}(Serializer));
export { ObjectAsMapSerializer };
//# sourceMappingURL=ObjectAsMapSerializer.js.map