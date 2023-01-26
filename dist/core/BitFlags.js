"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BitFlags = void 0;
const clone_1 = require("./clone");
class BitFlags {
    constructor(value) {
        this._value = value !== undefined && value !== null ? value : 0;
    }
    get value() {
        return this._value;
    }
    has(flag) {
        return (this._value & flag) === flag;
    }
    not(flag) {
        return this.has(flag) === false;
    }
    add(flag) {
        return new BitFlags(this._value | flag);
    }
    remove(flag) {
        return new BitFlags(this._value & ~flag);
    }
    toggle(flag) {
        return new BitFlags(this._value ^ flag);
    }
    [clone_1.clone]() {
        return new BitFlags(this._value);
    }
}
exports.BitFlags = BitFlags;
//# sourceMappingURL=BitFlags.js.map