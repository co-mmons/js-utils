export function toFloat(value) {
    if (typeof value === "number") {
        return value;
    }
    else if (typeof value === "string") {
        return parseFloat(value);
    }
    else if (value) {
        throw "Cannot convert value \"" + value + "\" to float";
    }
    else {
        return value;
    }
}
export function toInteger(value) {
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
export function toString(value) {
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
export function isArrayContainsInstanceOf(value, type) {
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
export function mapEntries(map) {
    var array = [];
    for (var key in map) {
        array.push({ key: key, value: map[key] });
    }
    return array;
}
//# sourceMappingURL=types.js.map