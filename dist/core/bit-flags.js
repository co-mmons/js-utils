var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
export var BitFlags = (function () {
    function BitFlags(value) {
        this._value = value !== undefined ? value : 0;
    }
    Object.defineProperty(BitFlags.prototype, "value", {
        get: function () {
            return this._value;
        },
        enumerable: true,
        configurable: true
    });
    BitFlags.prototype.has = function (flag) {
        return (this._value & flag) == flag;
    };
    BitFlags.prototype.not = function (flag) {
        return this.has(flag) == false;
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
export var BitFlagsMutable = (function (_super) {
    __extends(BitFlagsMutable, _super);
    function BitFlagsMutable(value) {
        _super.call(this, value);
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
//# sourceMappingURL=bit-flags.js.map