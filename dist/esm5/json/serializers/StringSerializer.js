import { __extends } from "tslib";
import { Serializer } from "../Serializer";
var StringSerializer = /** @class */ (function (_super) {
    __extends(StringSerializer, _super);
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
}(Serializer));
export { StringSerializer };
(function (StringSerializer) {
    StringSerializer.instance = new StringSerializer;
})(StringSerializer || (StringSerializer = {}));
//# sourceMappingURL=StringSerializer.js.map