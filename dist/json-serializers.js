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
var EnumAsStringSerializer = (function (_super) {
    __extends(EnumAsStringSerializer, _super);
    function EnumAsStringSerializer(enumClass) {
        _super.call(this);
        this.enumClass = enumClass;
    }
    EnumAsStringSerializer.prototype.serialize = function (enumValue) {
        if (enumValue) {
            return this.enumClass[enumValue];
        }
        else {
            return null;
        }
    };
    return EnumAsStringSerializer;
}(json_1.JsonSerializer));
exports.EnumAsStringSerializer = EnumAsStringSerializer;
