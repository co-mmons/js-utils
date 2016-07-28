"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var json_1 = require("./json");
/**
 * Serializes enum as a String. By default enums are serialized as numbers.
 */
var EnumAsStringJsonSerializer = (function (_super) {
    __extends(EnumAsStringJsonSerializer, _super);
    function EnumAsStringJsonSerializer(enumClass) {
        _super.call(this);
        this.enumClass = enumClass;
    }
    EnumAsStringJsonSerializer.prototype.serialize = function (enumValue) {
        if (enumValue) {
            return this.enumClass[enumValue];
        }
        else {
            return null;
        }
    };
    return EnumAsStringJsonSerializer;
}(json_1.JsonSerializer));
exports.EnumAsStringJsonSerializer = EnumAsStringJsonSerializer;
