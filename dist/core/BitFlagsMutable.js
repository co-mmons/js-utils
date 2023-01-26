"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BitFlagsMutable = void 0;
const BitFlags_1 = require("./BitFlags");
const clone_1 = require("./clone");
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
    [clone_1.clone]() {
        return new BitFlagsMutable(this._value);
    }
}
exports.BitFlagsMutable = BitFlagsMutable;
//# sourceMappingURL=BitFlagsMutable.js.map