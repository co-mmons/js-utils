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
        throw new Error("Invalid value " + JSON.stringify(value) + " for enum " + this.jsonTypeName);
    }
    static get jsonTypeName() {
        return this.name;
    }
    static valueOf(name) {
        CHECK_NAME: if (name) {
            if (typeof name === "object") {
                if (name["@type"] === this.jsonTypeName) {
                    name = name.name;
                }
                else {
                    break CHECK_NAME;
                }
            }
            for (const v of valuesRef(this)) {
                if (v.name === name) {
                    return v;
                }
            }
        }
        throw new Error("Invalid value " + JSON.stringify(name) + " for enum " + this.name);
    }
    equals(value) {
        if (typeof value === "string") {
            return value === this.name;
        }
        else if ("@type" in value) {
            return value["@type"] === this.__jsonTypeName && value.name === this.name;
        }
        else if (value.constructor === this.constructor) {
            return value.name === this.name;
        }
        return false;
    }
    toJSON() {
        return { "@type": this.__jsonTypeName, name: this.name };
    }
    get __jsonTypeName() {
        return this.constructor["jsonTypeName"] || this.constructor.name;
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