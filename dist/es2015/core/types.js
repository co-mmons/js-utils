"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function toFloat(value) {
    if (typeof value === "number") {
        return value;
    }
    else if (typeof value === "string") {
        return parseFloat(value);
    }
    else if (value) {
        throw `Cannot convert value "${value}" to float`;
    }
    else {
        return value;
    }
}
exports.toFloat = toFloat;
function toInteger(value) {
    if (typeof value === "number") {
        return value;
    }
    else if (typeof value === "string") {
        return parseInt(value);
    }
    else if (value) {
        throw `Cannot convert value "${value}" to integer`;
    }
    else {
        return value;
    }
}
exports.toInteger = toInteger;
function toString(value) {
    if (typeof value === "string") {
        return value;
    }
    else if (value === undefined || value === null) {
        return value;
    }
    else {
        return value.toString();
    }
}
exports.toString = toString;
function isArrayContainsInstanceOf(value, type) {
    if (Array.isArray(value)) {
        for (let a of value) {
            if (a instanceof type) {
                return true;
            }
        }
    }
    return false;
}
exports.isArrayContainsInstanceOf = isArrayContainsInstanceOf;
function mapEntries(map) {
    let array = [];
    for (let key in map) {
        array.push({ key: key, value: map[key] });
    }
    return array;
}
exports.mapEntries = mapEntries;
//# sourceMappingURL=types.js.map