"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetSerializer = void 0;
var tslib_1 = require("tslib");
var core_1 = require("../../core");
var Serializer_1 = require("../Serializer");
var ObjectSerializer_1 = require("./ObjectSerializer");
var SetSerializer = /** @class */ (function (_super) {
    tslib_1.__extends(SetSerializer, _super);
    function SetSerializer(valueTypeOrSerializer) {
        var _this = _super.call(this) || this;
        if (arguments.length == 1 && !valueTypeOrSerializer) {
            throw new Error("Value type passed to SetSerializer is undefined - check for class reference cycle");
        }
        if (valueTypeOrSerializer) {
            _this.typeOrSerializer = core_1.resolveForwardRef(valueTypeOrSerializer);
        }
        return _this;
    }
    SetSerializer.prototype.serialize = function (value, options) {
        var e_1, _a;
        if (this.isUndefinedOrNull(value)) {
            return this.serializeUndefinedOrNull(value, options);
        }
        else if (value instanceof Set) {
            var array = [];
            var serializer = this.typeOrSerializer instanceof Serializer_1.Serializer ? this.typeOrSerializer : (this.typeOrSerializer && ObjectSerializer_1.ObjectSerializer.getTypeSerializer(this.typeOrSerializer, options === null || options === void 0 ? void 0 : options.typeProviders)) || ObjectSerializer_1.ObjectSerializer.instance;
            try {
                for (var _b = tslib_1.__values(value.values()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var i = _c.value;
                    array.push(serializer.serialize(i, options));
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return array;
        }
        else if (!options || !options.ignoreErrors) {
            throw new Error("Cannot serialize \"" + value + "\" as Set");
        }
        else {
            return undefined;
        }
    };
    SetSerializer.prototype.unserialize = function (json, options) {
        var e_2, _a;
        if (Array.isArray(json)) {
            var zet = new Set();
            var serializer = this.typeOrSerializer instanceof Serializer_1.Serializer ? this.typeOrSerializer : (this.typeOrSerializer && ObjectSerializer_1.ObjectSerializer.getTypeSerializer(this.typeOrSerializer, options === null || options === void 0 ? void 0 : options.typeProviders)) || ObjectSerializer_1.ObjectSerializer.instance;
            try {
                for (var json_1 = tslib_1.__values(json), json_1_1 = json_1.next(); !json_1_1.done; json_1_1 = json_1.next()) {
                    var i = json_1_1.value;
                    zet.add(serializer.unserialize(i, options));
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (json_1_1 && !json_1_1.done && (_a = json_1.return)) _a.call(json_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return zet;
        }
        else if (this.isUndefinedOrNull(json)) {
            return this.unserializeUndefinedOrNull(json, options);
        }
        else if (!options || !options.ignoreErrors) {
            throw new Error("Cannot unserialize \"" + json + "\" to Set");
        }
        else {
            return undefined;
        }
    };
    return SetSerializer;
}(Serializer_1.Serializer));
exports.SetSerializer = SetSerializer;
(function (SetSerializer) {
    SetSerializer.ofAny = new SetSerializer();
    SetSerializer.ofString = new SetSerializer(String);
    SetSerializer.ofNumber = new SetSerializer(Number);
    SetSerializer.ofBoolean = new SetSerializer(Boolean);
})(SetSerializer = exports.SetSerializer || (exports.SetSerializer = {}));
exports.SetSerializer = SetSerializer;
//# sourceMappingURL=SetSerializer.js.map