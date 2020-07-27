"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deepClone = void 0;
function deepClone(obj) {
    if (obj === undefined || obj === null || typeof obj === "string" || typeof obj === "number" || typeof obj === "boolean") {
        return obj;
    }
    return JSON.parse(JSON.stringify(obj));
}
exports.deepClone = deepClone;
//# sourceMappingURL=deep-clone.js.map