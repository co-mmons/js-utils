export function enumValues(enumClass) {
    var values = [];
    for (var key in enumClass) {
        values.push(enumClass[key]);
    }
    values.length = values.length / 2;
    return values;
}
export { BitFlags } from "./bit-flags";
//# sourceMappingURL=index.js.map