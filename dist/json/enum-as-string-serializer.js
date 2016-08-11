"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var index_1 = require("./index");
/**
 * Serializes enum as a String. By default enums are serialized as numbers.
 */
var EnumAsStringJsonSerializer = (function (_super) {
    __extends(EnumAsStringJsonSerializer, _super);
    function EnumAsStringJsonSerializer(enumClass) {
        _super.call(this);
        this.enumClass = enumClass;
    }
    EnumAsStringJsonSerializer.prototype.serialize = function (value, options) {
        if (value) {
            return this.enumClass[value];
        }
        else {
            return undefined;
        }
    };
    EnumAsStringJsonSerializer.prototype.unserialize = function (value, options) {
        if (value && typeof value === "string") {
            return this.enumClass[value];
        }
        else {
            return undefined;
        }
    };
    return EnumAsStringJsonSerializer;
}(index_1.Serializer));
exports.EnumAsStringJsonSerializer = EnumAsStringJsonSerializer;
//# sourceMappingURL=enum-as-string-serializer.js.map