"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringSerializer = void 0;
var tslib_1 = require("tslib");
var Serializer_1 = require("../Serializer");
var StringSerializer = /** @class */ (function (_super) {
    tslib_1.__extends(StringSerializer, _super);
    function StringSerializer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StringSerializer.prototype.serialize = function (value, options) {
        if (this.isUndefinedOrNull(value)) {
            return this.serializeUndefinedOrNull(value, options);
        }
        else if (typeof value === "string") {
            return value;
        }
        else if (options && options.notStrict) {
            return value + "";
        }
        else if (!options || !options.ignoreErrors) {
            throw new Error("Cannot serialize \"" + value + "\" as string");
        }
        else {
            return undefined;
        }
    };
    StringSerializer.prototype.unserialize = function (value, options) {
        if (typeof value === "string") {
            return value;
        }
        else if (this.isUndefinedOrNull(value)) {
            return this.unserializeUndefinedOrNull(value, options);
        }
        else if (options && options.notStrict) {
            return value + "";
        }
        else if (!options || !options.ignoreErrors) {
            throw new Error("Cannot unserialize \"" + value + "\" to string");
        }
        else {
            return undefined;
        }
    };
    return StringSerializer;
}(Serializer_1.Serializer));
exports.StringSerializer = StringSerializer;
(function (StringSerializer) {
    StringSerializer.instance = new StringSerializer;
})(StringSerializer = exports.StringSerializer || (exports.StringSerializer = {}));
exports.StringSerializer = StringSerializer;
//# sourceMappingURL=StringSerializer.js.map