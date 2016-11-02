"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var serializer_1 = require("./serializer");
var index_1 = require("./index");
/**
 * Serializer of objects, that should be treated as Maps, where key is always a string and value of given type.
 */
var ObjectAsMapSerializer = (function (_super) {
    __extends(ObjectAsMapSerializer, _super);
    function ObjectAsMapSerializer(valueType) {
        _super.call(this);
        this.valueType = valueType;
    }
    ObjectAsMapSerializer.prototype.serialize = function (value, options) {
        if (this.isUndefinedOrNull(value)) {
            return this.serializeUndefinedOrNull(value, options);
        }
        else if (typeof value === "object") {
            var json = {};
            for (var i in value) {
                json[i] = this.valueType instanceof serializer_1.Serializer ? this.valueType.serialize(value) : index_1.serialize(value);
            }
            return json;
        }
        else if (!options || !options.ignoreErrors) {
            throw 'Cannot serialize "' + value + " as object";
        }
        else {
            return undefined;
        }
    };
    ObjectAsMapSerializer.prototype.unserialize = function (value, options) {
        if (typeof value === "object") {
            if (this.valueType) {
                var object = [];
                for (var i in value) {
                    object[i] = this.valueType instanceof serializer_1.Serializer ? this.valueType.unserialize(value[i]) : index_1.unserialize(value[i], this.valueType);
                }
                return object;
            }
            else {
                return value;
            }
        }
        else if (this.isUndefinedOrNull(value)) {
            return this.unserializeUndefinedOrNull(value, options);
        }
        else if (!options || !options.ignoreErrors) {
            throw 'Cannot unserialize "' + value + " to object.";
        }
        else {
            return undefined;
        }
    };
    return ObjectAsMapSerializer;
}(serializer_1.Serializer));
exports.ObjectAsMapSerializer = ObjectAsMapSerializer;
//# sourceMappingURL=object-serializer.js.map