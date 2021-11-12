"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serialize = void 0;
const serializeImpl_1 = require("./serializeImpl");
function serialize(object, options) {
    return (0, serializeImpl_1.serializeImpl)(object, null, options);
}
exports.serialize = serialize;
//# sourceMappingURL=serialize.js.map