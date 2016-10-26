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
var bit_flags_1 = require("./bit-flags");
exports.BitFlags = bit_flags_1.BitFlags;
//# sourceMappingURL=index.js.map