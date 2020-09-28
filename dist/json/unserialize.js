"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unserialize = void 0;
const unserializeImpl_1 = require("./unserializeImpl");
function unserialize(json, targetClass, options) {
    if (json === undefined || json === null) {
        return json;
    }
    return unserializeImpl_1.unserializeImpl(json, targetClass, options);
}
exports.unserialize = unserialize;
//# sourceMappingURL=unserialize.js.map