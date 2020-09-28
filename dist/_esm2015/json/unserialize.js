import { findTypeSerializer } from "./findTypeSerializer";
import { ObjectSerializer } from "./serializers";
import { unserializeImpl } from "./unserializeImpl";
export function unserialize(json, targetClass, options) {
    if (json === undefined || json === null) {
        return json;
    }
    if (targetClass) {
        const internalType = targetClass;
        const serializer = findTypeSerializer(targetClass);
        const array = Array.isArray(json) ? [] : undefined;
        for (const i of array ? json : [json]) {
            const unserialized = unserializeImpl(i, serializer || internalType, options);
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
    return ObjectSerializer.instance.unserialize(json, options);
}
//# sourceMappingURL=unserialize.js.map