"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Serializer = void 0;
var Serializer = /** @class */ (function () {
    function Serializer() {
    }
    Serializer.prototype.serialize = function (object, options) {
        return object;
    };
    Serializer.prototype.isUndefinedOrNull = function (value) {
        return value === undefined || value === null;
    };
    Serializer.prototype.serializeUndefinedOrNull = function (value, options) {
        return value;
    };
    Serializer.prototype.unserializeUndefinedOrNull = function (value, options) {
        if (options && options.disallowUndefinedOrNull) {
            throw "Undefined/null value is not allowed";
        }
        else {
            return value;
        }
    };
    return Serializer;
}());
exports.Serializer = Serializer;
//# sourceMappingURL=Serializer.js.map