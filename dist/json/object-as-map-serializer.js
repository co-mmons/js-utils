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
 * Serializer of objects, that should be treated as Maps, where key is always a string and value of given type.
 */
var ObjectAsMapSerializer = /** @class */ (function (_super) {
    __extends(ObjectAsMapSerializer, _super);
    function ObjectAsMapSerializer(valueType) {
        var _this = _super.call(this) || this;
        _this.valueType = valueType;
        return _this;
    }
    ObjectAsMapSerializer.prototype.serialize = function (value, options) {
        if (this.isUndefinedOrNull(value)) {
            return this.serializeUndefinedOrNull(value, options);
        }
        else if (typeof value === "object") {
            var json = {};
            for (var i in value) {
                json[i] = this.valueType instanceof serialization_1.Serializer ? this.valueType.serialize(value[i]) : serialization_1.serialize(value[i]);
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
                var object = {};
                for (var i in value) {
                    object[i] = this.valueType instanceof serialization_1.Serializer ? this.valueType.unserialize(value[i]) : serialization_1.unserialize(value[i], this.valueType);
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
}(serialization_1.Serializer));
exports.ObjectAsMapSerializer = ObjectAsMapSerializer;
//# sourceMappingURL=object-as-map-serializer.js.map