"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Enum {
    constructor(name) {
        this.name = name;
        addValue(this.constructor, this);
    }
    static values() {
        return valuesRef(this).slice();
    }
    static fromJSON(value) {
        let name;
        if (typeof value === "string") {
            name = value;
        }
        else if (typeof value === "object" && typeof value.name === "string") {
            name = value.name;
        }
        if (name) {
            for (const v of valuesRef(this)) {
                if (v.name === name) {
                    return v;
                }
            }
        }
        throw new Error("Invalid value " + value + " for enum " + this.name);
    }
    static valueOf(name) {
        if (typeof name === "object") {
            name = name.name;
        }
        for (const v of valuesRef(this)) {
            if (v.name === name) {
                return v;
            }
        }
        throw new Error("Invalid value " + name + " for enum " + this.name);
    }
    equals(name) {
        if (typeof name === "string") {
            return name === this.name;
        }
        else if (name.name === this.name) {
            return true;
        }
        return false;
    }
    toJSON() {
        return { name: this.name };
    }
}
exports.Enum = Enum;
function addValue(enumClass, value) {
    valuesRef(enumClass).push(value);
}
function valuesRef(enumClass) {
    if (!enumClass["__enumValues"]) {
        enumClass["__enumValues"] = [];
    }
    return enumClass["__enumValues"];
}
//# sourceMappingURL=Enum.js.map