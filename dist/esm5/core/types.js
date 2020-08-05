import { __values } from "tslib";
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
    var e_1, _a;
    if (Array.isArray(value)) {
        try {
            for (var value_1 = __values(value), value_1_1 = value_1.next(); !value_1_1.done; value_1_1 = value_1.next()) {
                var a = value_1_1.value;
                if (a instanceof type) {
                    return true;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (value_1_1 && !value_1_1.done && (_a = value_1.return)) _a.call(value_1);
            }
            finally { if (e_1) throw e_1.error; }
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