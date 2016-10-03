var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { Serializer } from "./serializer";
export var NumberSerializer = (function (_super) {
    __extends(NumberSerializer, _super);
    function NumberSerializer() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(NumberSerializer, "INSTANCE", {
        get: function () {
            return DEFAULT_INSTANCE;
        },
        enumerable: true,
        configurable: true
    });
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
            throw 'Cannot serialize "' + value + " as number";
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
            throw 'Cannot unserialize "' + value + " to number.";
        }
        else {
            return undefined;
        }
    };
    return NumberSerializer;
}(Serializer));
var DEFAULT_INSTANCE = new NumberSerializer();
//# sourceMappingURL=number-serializer.js.map