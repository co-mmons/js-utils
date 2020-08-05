"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArraySerializer = void 0;
var tslib_1 = require("tslib");
var core_1 = require("../../core");
var Serializer_1 = require("../Serializer");
var ObjectSerializer_1 = require("./ObjectSerializer");
var ArraySerializer = /** @class */ (function (_super) {
    tslib_1.__extends(ArraySerializer, _super);
    function ArraySerializer(valueTypeOrSerializer) {
        var _this = _super.call(this) || this;
        if (arguments.length == 1 && !valueTypeOrSerializer) {
            throw new Error("Value type passed to Json Array Serializer is undefined - check, whether class reference cycle");
        }
        if (valueTypeOrSerializer) {
            _this.typeOrSerializer = core_1.resolveForwardRef(valueTypeOrSerializer);
        }
        return _this;
    }
    ArraySerializer.prototype.serialize = function (value, options) {
        var e_1, _a;
        if (this.isUndefinedOrNull(value)) {
            return this.serializeUndefinedOrNull(value, options);
        }
        else if (Array.isArray(value)) {
            var array = [];
            var serializer = this.typeOrSerializer instanceof Serializer_1.Serializer ? this.typeOrSerializer : (this.typeOrSerializer && ObjectSerializer_1.ObjectSerializer.getTypeSerializer(this.typeOrSerializer, options === null || options === void 0 ? void 0 : options.typeProviders)) || ObjectSerializer_1.ObjectSerializer.instance;
            try {
                for (var value_1 = tslib_1.__values(value), value_1_1 = value_1.next(); !value_1_1.done; value_1_1 = value_1.next()) {
                    var i = value_1_1.value;
                    array.push(serializer.serialize(i, options));
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (value_1_1 && !value_1_1.done && (_a = value_1.return)) _a.call(value_1);
                }
                finally { if (e_1) throw e_1.error; }
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
        var e_2, _a;
        if (Array.isArray(json)) {
            var array = [];
            var serializer = this.typeOrSerializer instanceof Serializer_1.Serializer ? this.typeOrSerializer : (this.typeOrSerializer && ObjectSerializer_1.ObjectSerializer.getTypeSerializer(this.typeOrSerializer, options === null || options === void 0 ? void 0 : options.typeProviders)) || ObjectSerializer_1.ObjectSerializer.instance;
            try {
                for (var json_1 = tslib_1.__values(json), json_1_1 = json_1.next(); !json_1_1.done; json_1_1 = json_1.next()) {
                    var i = json_1_1.value;
                    array.push(serializer.unserialize(i, options));
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (json_1_1 && !json_1_1.done && (_a = json_1.return)) _a.call(json_1);
                }
                finally { if (e_2) throw e_2.error; }
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
}(Serializer_1.Serializer));
exports.ArraySerializer = ArraySerializer;
(function (ArraySerializer) {
    ArraySerializer.ofAny = new ArraySerializer();
    ArraySerializer.ofString = new ArraySerializer(String);
    ArraySerializer.ofNumber = new ArraySerializer(Number);
    ArraySerializer.ofBoolean = new ArraySerializer(Boolean);
})(ArraySerializer = exports.ArraySerializer || (exports.ArraySerializer = {}));
exports.ArraySerializer = ArraySerializer;
//# sourceMappingURL=ArraySerializer.js.map