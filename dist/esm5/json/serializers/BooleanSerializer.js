import { __extends } from "tslib";
import { Serializer } from "../Serializer";
var BooleanSerializer = /** @class */ (function (_super) {
    __extends(BooleanSerializer, _super);
    function BooleanSerializer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BooleanSerializer.prototype.serialize = function (value, options) {
        if (this.isUndefinedOrNull(value)) {
            return this.serializeUndefinedOrNull(value, options);
        }
        else if (typeof value === "boolean") {
            return value;
        }
        else if (options && options.notStrict) {
            return !!value;
        }
        else if (!options || !options.ignoreErrors) {
            throw new Error("Cannot serialize \"" + value + "\" as boolean");
        }
        else {
            return undefined;
        }
    };
    BooleanSerializer.prototype.unserialize = function (value, options) {
        if (typeof value === "boolean") {
            return value;
        }
        else if (this.isUndefinedOrNull(value)) {
            return this.unserializeUndefinedOrNull(value, options);
        }
        else if (options && options.notStrict) {
            return !!value;
        }
        else if (!options || !options.ignoreErrors) {
            throw new Error("Cannot unserialize \"" + value + "\" to boolean");
        }
        else {
            return undefined;
        }
    };
    return BooleanSerializer;
}(Serializer));
export { BooleanSerializer };
(function (BooleanSerializer) {
    BooleanSerializer.instance = new BooleanSerializer();
})(BooleanSerializer || (BooleanSerializer = {}));
//# sourceMappingURL=BooleanSerializer.js.map