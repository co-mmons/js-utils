"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unserialize = void 0;
const findTypeSerializer_1 = require("./findTypeSerializer");
const unserializeImpl_1 = require("./unserializeImpl");
function unserialize(json, targetClass, options) {
    if (json === undefined || json === null) {
        return json;
    }
    const internalType = targetClass;
    const serializer = targetClass && findTypeSerializer_1.findTypeSerializer(targetClass);
    return unserializeImpl_1.unserializeImpl(json, serializer || internalType || null, options);
}
exports.unserialize = unserialize;
//# sourceMappingURL=unserialize.js.map