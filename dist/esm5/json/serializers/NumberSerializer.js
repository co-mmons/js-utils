import { __extends } from "tslib";
import { Serializer } from "../Serializer";
var NumberSerializer = /** @class */ (function (_super) {
    __extends(NumberSerializer, _super);
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
}(Serializer));
export { NumberSerializer };
(function (NumberSerializer) {
    NumberSerializer.instance = new NumberSerializer();
})(NumberSerializer || (NumberSerializer = {}));
//# sourceMappingURL=NumberSerializer.js.map