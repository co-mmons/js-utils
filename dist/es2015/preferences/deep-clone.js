"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function deepClone(obj) {
    return obj === undefined ? undefined : JSON.parse(JSON.stringify(obj));
}
exports.deepClone = deepClone;
//# sourceMappingURL=deep-clone.js.map