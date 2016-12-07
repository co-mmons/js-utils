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
//# sourceMappingURL=types.js.map