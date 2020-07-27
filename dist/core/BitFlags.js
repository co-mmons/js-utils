"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BitFlags = void 0;
var BitFlags = /** @class */ (function () {
    function BitFlags(value) {
        this._value = value !== undefined && value !== null ? value : 0;
    }
    Object.defineProperty(BitFlags.prototype, "value", {
        get: function () {
            return this._value;
        },
        enumerable: false,
        configurable: true
    });
    BitFlags.prototype.has = function (flag) {
        return (this._value & flag) === flag;
    };
    BitFlags.prototype.not = function (flag) {
        return this.has(flag) === false;
    };
    BitFlags.prototype.add = function (flag) {
        return new BitFlags(this._value | flag);
    };
    BitFlags.prototype.remove = function (flag) {
        return new BitFlags(this._value & ~flag);
    };
    BitFlags.prototype.toggle = function (flag) {
        return new BitFlags(this._value ^ flag);
    };
    return BitFlags;
}());
exports.BitFlags = BitFlags;
