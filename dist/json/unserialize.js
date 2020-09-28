"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unserialize = void 0;
const findTypeSerializer_1 = require("./findTypeSerializer");
const serializers_1 = require("./serializers");
const unserializeImpl_1 = require("./unserializeImpl");
function unserialize(json, targetClass, options) {
    if (json === undefined || json === null) {
        return json;
    }
    if (targetClass) {
        const internalType = targetClass;
        const serializer = findTypeSerializer_1.findTypeSerializer(targetClass);
        const array = Array.isArray(json) ? [] : undefined;
        for (const i of array ? json : [json]) {
            const unserialized = unserializeImpl_1.unserializeImpl(i, serializer || internalType, options);
            if (array) {
                array.push(unserialized);
            }
            else {
                return unserialized;
            }
        }
        if (array) {
            return array;
        }
    }
    return serializers_1.ObjectSerializer.instance.unserialize(json, options);
}
exports.unserialize = unserialize;
//# sourceMappingURL=unserialize.js.map