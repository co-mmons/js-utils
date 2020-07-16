"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSupertypes = void 0;
const getPrototypesTree_1 = require("./getPrototypesTree");
function getSupertypes(type) {
    return getPrototypesTree_1.getPrototypesTree(type.prototype).map(type => type.constructor);
}
exports.getSupertypes = getSupertypes;
//# sourceMappingURL=getSupertypes.js.map