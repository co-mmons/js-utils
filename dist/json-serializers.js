"use strict";
var JsonSerializer = (function () {
    function JsonSerializer() {
    }
    JsonSerializer.prototype.serialize = function (object) {
        return object;
    };
    return JsonSerializer;
}());
exports.JsonSerializer = JsonSerializer;
/**
 * Serializes enum as a String. By default enums are serialized as numbers.
 */
var EnumAsStringSerializer = (function () {
    function EnumAsStringSerializer(enumClass) {
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
}());
exports.EnumAsStringSerializer = EnumAsStringSerializer;
