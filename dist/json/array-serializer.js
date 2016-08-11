"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var index_1 = require("./index");
var ArraySerializer = (function (_super) {
    __extends(ArraySerializer, _super);
    function ArraySerializer(valueType) {
        _super.call(this);
    }
    Object.defineProperty(ArraySerializer, "INSTANCE", {
        get: function () {
            return DEFAULT_INSTANCE;
        },
        enumerable: true,
        configurable: true
    });
    ArraySerializer.prototype.serialize = function (value, options) {
        if (this.isUndefinedOrNull(value)) {
            return this.serializeUndefinedOrNull(value, options);
        }
        else if (Array.isArray(value)) {
            return value;
        }
        else if (!options || !options.ignoreErrors) {
            throw 'Cannot serialize "' + value + " as array";
        }
        else {
            return undefined;
        }
    };
    ArraySerializer.prototype.unserialize = function (value, options) {
        if (Array.isArray(value)) {
            return value;
        }
        else if (this.isUndefinedOrNull(value)) {
            return this.unserializeUndefinedOrNull(value, options);
        }
        else if (!options || !options.ignoreErrors) {
            throw 'Cannot unserialize "' + value + " to array.";
        }
        else {
            return undefined;
        }
    };
    return ArraySerializer;
}(index_1.Serializer));
exports.ArraySerializer = ArraySerializer;
var DEFAULT_INSTANCE = new ArraySerializer();
exports.ArrayOfString = new ArraySerializer(String);
exports.ArrayOfNumber = new ArraySerializer(Number);
//# sourceMappingURL=array-serializer.js.map