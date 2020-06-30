"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
function registerType(typeName, typeClass, options) {
    if (types_1.types[typeName] && types_1.types[typeName] !== typeClass && (!options || !options.replace)) {
        throw new Error(`Type ${typeName} already registered wither other class`);
    }
    types_1.types[typeName] = typeClass;
}
exports.registerType = registerType;
//# sourceMappingURL=registerType.js.map