"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSupertypes = void 0;
const getPrototypes_1 = require("./getPrototypes");
function getSupertypes(type) {
    return getPrototypes_1.getPrototypes(type.prototype).map(type => type.constructor);
}
exports.getSupertypes = getSupertypes;
//# sourceMappingURL=getSupertypes.js.map