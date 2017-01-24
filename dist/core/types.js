"use strict";
function toInteger(value) {
    if (typeof value === "number") {
        return value;
    }
    else if (typeof value === "string") {
        return parseInt(value);
    }
    else if (value) {
        throw "Cannot convert value \"" + value + "\" to integer";
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
        for (var _i = 0, value_1 = value; _i < value_1.length; _i++) {
            var a = value_1[_i];
            if (a instanceof type) {
                return true;
            }
        }
    }
    return false;
}
exports.isArrayContainsInstanceOf = isArrayContainsInstanceOf;
function mapEntries(map) {
    var array = [];
    for (var key in map) {
        array.push({ key: key, value: map[key] });
    }
    return array;
}
exports.mapEntries = mapEntries;
//# sourceMappingURL=types.js.map