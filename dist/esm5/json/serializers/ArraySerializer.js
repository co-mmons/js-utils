import { __extends } from "tslib";
import { resolveForwardRef } from "../../core";
import { Serializer } from "../Serializer";
import { ObjectSerializer } from "./ObjectSerializer";
var ArraySerializer = /** @class */ (function (_super) {
    __extends(ArraySerializer, _super);
    function ArraySerializer(valueTypeOrSerializer) {
        var _this = _super.call(this) || this;
        if (arguments.length == 1 && !valueTypeOrSerializer) {
            throw new Error("Value type passed to Json Array Serializer is undefined - check, whether class reference cycle");
        }
        if (valueTypeOrSerializer) {
            _this.typeOrSerializer = resolveForwardRef(valueTypeOrSerializer);
        }
        return _this;
    }
    ArraySerializer.prototype.serialize = function (value, options) {
        if (this.isUndefinedOrNull(value)) {
            return this.serializeUndefinedOrNull(value, options);
        }
        else if (Array.isArray(value)) {
            var array = [];
            var serializer = this.typeOrSerializer instanceof Serializer ? this.typeOrSerializer : (this.typeOrSerializer && ObjectSerializer.getTypeSerializer(this.typeOrSerializer, options === null || options === void 0 ? void 0 : options.typeProviders)) || ObjectSerializer.instance;
            for (var _i = 0, value_1 = value; _i < value_1.length; _i++) {
                var i = value_1[_i];
                array.push(serializer.serialize(i, options));
            }
            return array;
        }
        else if (!options || !options.ignoreErrors) {
            throw new Error("Cannot serialize \"" + value + "\" as array");
        }
        else {
            return undefined;
        }
    };
    ArraySerializer.prototype.unserialize = function (json, options) {
        if (Array.isArray(json)) {
            var array = [];
            var serializer = this.typeOrSerializer instanceof Serializer ? this.typeOrSerializer : (this.typeOrSerializer && ObjectSerializer.getTypeSerializer(this.typeOrSerializer, options === null || options === void 0 ? void 0 : options.typeProviders)) || ObjectSerializer.instance;
            for (var _i = 0, json_1 = json; _i < json_1.length; _i++) {
                var i = json_1[_i];
                array.push(serializer.unserialize(i, options));
            }
            return array;
        }
        else if (this.isUndefinedOrNull(json)) {
            return this.unserializeUndefinedOrNull(json, options);
        }
        else if (!options || !options.ignoreErrors) {
            throw new Error("Cannot unserialize \"" + json + "\" to array");
        }
        else {
            return undefined;
        }
    };
    return ArraySerializer;
}(Serializer));
export { ArraySerializer };
(function (ArraySerializer) {
    ArraySerializer.ofAny = new ArraySerializer();
    ArraySerializer.ofString = new ArraySerializer(String);
    ArraySerializer.ofNumber = new ArraySerializer(Number);
    ArraySerializer.ofBoolean = new ArraySerializer(Boolean);
})(ArraySerializer || (ArraySerializer = {}));
//# sourceMappingURL=ArraySerializer.js.map