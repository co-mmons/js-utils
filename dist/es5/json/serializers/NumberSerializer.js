"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberSerializer = void 0;
var tslib_1 = require("tslib");
var Serializer_1 = require("../Serializer");
var NumberSerializer = /** @class */ (function (_super) {
    tslib_1.__extends(NumberSerializer, _super);
    function NumberSerializer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NumberSerializer.prototype.serialize = function (value, options) {
        if (this.isUndefinedOrNull(value)) {
            return this.serializeUndefinedOrNull(value, options);
        }
        else if (typeof value === "number") {
            return value;
        }
        else if (options && options.notStrict && typeof value === "string") {
            return parseFloat(value);
        }
        else if (!options || !options.ignoreErrors) {
            throw new Error("Cannot serialize \"" + value + "\" as number");
        }
        else {
            return undefined;
        }
    };
    NumberSerializer.prototype.unserialize = function (value, options) {
        if (typeof value === "number") {
            return value;
        }
        else if (this.isUndefinedOrNull(value)) {
            return this.unserializeUndefinedOrNull(value, options);
        }
        else if (options && options.notStrict) {
            return parseFloat(value);
        }
        else if (!options || !options.ignoreErrors) {
            throw new Error("Cannot unserialize \"" + value + "\" to number");
        }
        else {
            return undefined;
        }
    };
    return NumberSerializer;
}(Serializer_1.Serializer));
exports.NumberSerializer = NumberSerializer;
(function (NumberSerializer) {
    NumberSerializer.instance = new NumberSerializer();
})(NumberSerializer = exports.NumberSerializer || (exports.NumberSerializer = {}));
exports.NumberSerializer = NumberSerializer;
//# sourceMappingURL=NumberSerializer.js.map