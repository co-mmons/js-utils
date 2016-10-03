var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { Serializer } from "./serializer";
export var BooleanSerializer = (function (_super) {
    __extends(BooleanSerializer, _super);
    function BooleanSerializer() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(BooleanSerializer, "INSTANCE", {
        get: function () {
            return DEFAULT_INSTANCE;
        },
        enumerable: true,
        configurable: true
    });
    BooleanSerializer.prototype.serialize = function (value, options) {
        if (this.isUndefinedOrNull(value)) {
            return this.serializeUndefinedOrNull(value, options);
        }
        else if (typeof value === "boolean") {
            return value;
        }
        else if (options && options.notStrict) {
            return value ? true : false;
        }
        else if (!options || !options.ignoreErrors) {
            throw 'Cannot serialize "' + value + " as boolean";
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
            return value ? true : false;
        }
        else if (!options || !options.ignoreErrors) {
            throw 'Cannot unserialize "' + value + " to boolean.";
        }
        else {
            return undefined;
        }
    };
    return BooleanSerializer;
}(Serializer));
var DEFAULT_INSTANCE = new BooleanSerializer();
//# sourceMappingURL=boolean-serializer.js.map