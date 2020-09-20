"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BitFlagsMutable = void 0;
const BitFlags_1 = require("./BitFlags");
class BitFlagsMutable extends BitFlags_1.BitFlags {
    constructor(value) {
        super(value);
    }
    add(flag) {
        this._value |= flag;
        return this;
    }
    remove(flag) {
        this._value &= ~flag;
        return this;
    }
    toggle(flag) {
        this._value ^= flag;
        return this;
    }
}
exports.BitFlagsMutable = BitFlagsMutable;
//# sourceMappingURL=BitFlagsMutable.js.map