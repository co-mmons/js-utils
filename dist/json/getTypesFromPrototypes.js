"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTypesFromPrototypes = void 0;
function getTypesFromPrototypes(prototypes) {
    return prototypes.map(type => type.constructor);
}
exports.getTypesFromPrototypes = getTypesFromPrototypes;
//# sourceMappingURL=getTypesFromPrototypes.js.map