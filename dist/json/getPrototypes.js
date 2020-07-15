"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrototypes = void 0;
function getPrototypes(thiz) {
    const types = [];
    let prototype = Object.getPrototypeOf(thiz);
    while (prototype.constructor !== Object) {
        types.push(prototype);
        prototype = Object.getPrototypeOf(prototype);
    }
    return types;
}
exports.getPrototypes = getPrototypes;
//# sourceMappingURL=getPrototypes.js.map