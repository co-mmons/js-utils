import { findTypeSerializer } from "./findTypeSerializer";
import { ObjectSerializer } from "./serializers";
export function serialize(object, options) {
    return ObjectSerializer.instance.serialize(object, options);
}
export function unserialize(json, targetClass, options) {
    if (json === undefined || json === null) {
        return json;
    }
    if (targetClass) {
        const internalType = targetClass;
        const serializer = findTypeSerializer(targetClass);
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
    return ObjectSerializer.instance.unserialize(json, options);
}
//# sourceMappingURL=serialization.js.map