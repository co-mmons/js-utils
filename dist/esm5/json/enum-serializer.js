import * as tslib_1 from "tslib";
import { Serializer } from "./serialization";
/**
 * Serializes enum as a String. By default enums are serialized as numbers.
 */
var EnumAsStringSerializer = /** @class */ (function (_super) {
    tslib_1.__extends(EnumAsStringSerializer, _super);
    function EnumAsStringSerializer(enumClass) {
        var _this = _super.call(this) || this;
        _this.enumClass = enumClass;
        return _this;
    }
    EnumAsStringSerializer.prototype.serialize = function (value, options) {
        if (value !== undefined && value !== null) {
            return this.enumClass[value];
        }
        else {
            return undefined;
        }
    };
    EnumAsStringSerializer.prototype.unserialize = function (value, options) {
        if (value && typeof value === "string") {
            return this.enumClass[value];
        }
        else {
            return undefined;
        }
    };
    return EnumAsStringSerializer;
}(Serializer));
export { EnumAsStringSerializer };
//# sourceMappingURL=enum-serializer.js.map