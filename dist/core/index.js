export function enumValues(enumClass) {
    var values = [];
    for (var key in enumClass) {
        values.push(enumClass[key]);
    }
    values.length = values.length / 2;
    return values;
}
//# sourceMappingURL=index.js.map