import { __extends } from "tslib";
import { BitFlags } from "./BitFlags";
var BitFlagsMutable = /** @class */ (function (_super) {
    __extends(BitFlagsMutable, _super);
    function BitFlagsMutable(value) {
        return _super.call(this, value) || this;
    }
    BitFlagsMutable.prototype.add = function (flag) {
        this._value |= flag;
        return this;
    };
    BitFlagsMutable.prototype.remove = function (flag) {
        this._value &= ~flag;
        return this;
    };
    BitFlagsMutable.prototype.toggle = function (flag) {
        this._value ^= flag;
        return this;
    };
    return BitFlagsMutable;
}(BitFlags));
export { BitFlagsMutable };
//# sourceMappingURL=BitFlagsMutable.js.map