var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { Serializer } from "./serializer";
import { unserialize, serialize } from "./index";
export var ObjectAsMapSerializer = (function (_super) {
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
                json[i] = this.valueType instanceof Serializer ? this.valueType.serialize(value) : serialize(value);
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
                    object[i] = this.valueType instanceof Serializer ? this.valueType.unserialize(value[i]) : unserialize(value[i], this.valueType);
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
}(Serializer));
//# sourceMappingURL=object-serializer.js.map