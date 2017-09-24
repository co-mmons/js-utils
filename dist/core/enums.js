"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function enumValues(enumClass) {
    var values = [];
    for (var key in enumClass) {
        if (typeof enumClass[key] === "number" && enumClass[enumClass[key]]) {
            values.push(enumClass[key]);
        }
    }
    return values;
}
exports.enumValues = enumValues;
//# sourceMappingURL=enums.js.map