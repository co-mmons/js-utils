"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BitFlagsMutable = void 0;
var tslib_1 = require("tslib");
var BitFlags_1 = require("./BitFlags");
var BitFlagsMutable = /** @class */ (function (_super) {
    tslib_1.__extends(BitFlagsMutable, _super);
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
}(BitFlags_1.BitFlags));
exports.BitFlagsMutable = BitFlagsMutable;
//# sourceMappingURL=BitFlagsMutable.js.map