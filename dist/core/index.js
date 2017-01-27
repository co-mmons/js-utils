"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
function enumValues(enumClass) {
    var values = [];
    for (var key in enumClass) {
        values.push(enumClass[key]);
    }
    values.length = values.length / 2;
    return values;
}
exports.enumValues = enumValues;
__export(require("./bit-flags"));
__export(require("./types"));
__export(require("./classes"));
__export(require("./exception"));
__export(require("./type"));
__export(require("./forward-ref"));
//# sourceMappingURL=index.js.map