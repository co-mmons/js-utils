"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnumAsStringSerializer = void 0;
var tslib_1 = require("tslib");
var Serializer_1 = require("../Serializer");
/**
 * Serializes enum as a String. By default enums are serialized as numbers.
 */
var EnumAsStringSerializer = /** @class */ (function (_super) {
    tslib_1.__extends(EnumAsStringSerializer, _super);
    function EnumAsStringSerializer(enumClass) {
        var _this = _super.call(this) || this;
        _this.enumClass = enumClass;
        return _this;
    }
    EnumAsStringSerializer.prototype.serialize = function (value, options) {
        if (!this.isUndefinedOrNull(value)) {
            return this.enumClass[value];
        }
        else {
            return undefined;
        }
    };
    EnumAsStringSerializer.prototype.unserialize = function (value, options) {
        if (value && typeof value === "string") {
            return this.enumClass[value];
        }
        else {
            return undefined;
        }
    };
    return EnumAsStringSerializer;
}(Serializer_1.Serializer));
exports.EnumAsStringSerializer = EnumAsStringSerializer;
//# sourceMappingURL=EnumAsStringSerializer.js.map