"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unserialize = void 0;
const findTypeSerializer_1 = require("./findTypeSerializer");
const serializers_1 = require("./serializers");
function unserialize(json, targetClass, options) {
    if (json === undefined || json === null) {
        return json;
    }
    if (targetClass) {
        const internalType = targetClass;
        const serializer = findTypeSerializer_1.findTypeSerializer(targetClass);
        if (serializer) {
            return serializer.unserialize(json, options);
        }
        if (targetClass.prototype["fromJSON"]) {
            const instance = Object.create(targetClass.prototype);
            instance.fromJSON(json, options);
            return instance;
        }
        else if (internalType.fromJSON) {
            return internalType.fromJSON(json, options);
        }
        else if (targetClass !== Object) {
            return new targetClass(json);
        }
    }
    return serializers_1.ObjectSerializer.instance.unserialize(json, options);
}
exports.unserialize = unserialize;
//# sourceMappingURL=unserialize.js.map