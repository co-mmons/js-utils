"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var index_1 = require("./index");
var EnumAsStringSerializer = (function (_super) {
    __extends(EnumAsStringSerializer, _super);
    function EnumAsStringSerializer(enumClass) {
        _super.call(this);
        this.enumClass = enumClass;
    }
    EnumAsStringSerializer.prototype.serialize = function (value, options) {
        if (value) {
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
}(index_1.Serializer));
exports.EnumAsStringSerializer = EnumAsStringSerializer;
//# sourceMappingURL=enum-serializer.js.map