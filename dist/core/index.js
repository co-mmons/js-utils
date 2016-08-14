"use strict";
function enumValues(enumClass) {
    var values = [];
    for (var key in enumClass) {
        values.push(enumClass[key]);
    }
    values.length = values.length / 2;
    return values;
}
exports.enumValues = enumValues;
//# sourceMappingURL=index.js.map