"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var serialization_1 = require("./serialization");
/**
 * Serializes enum as a String. By default enums are serialized as numbers.
 */
var EnumAsStringSerializer = /** @class */ (function (_super) {
    __extends(EnumAsStringSerializer, _super);
    function EnumAsStringSerializer(enumClass) {
        var _this = _super.call(this) || this;
        _this.enumClass = enumClass;
        return _this;
    }
    EnumAsStringSerializer.prototype.serialize = function (value, options) {
        if (value !== undefined && value !== null) {
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
}(serialization_1.Serializer));
exports.EnumAsStringSerializer = EnumAsStringSerializer;
//# sourceMappingURL=enum-serializer.js.map