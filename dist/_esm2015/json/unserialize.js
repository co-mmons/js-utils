import { findTypeSerializer } from "./findTypeSerializer";
import { unserializeImpl } from "./unserializeImpl";
export function unserialize(json, targetClass, options) {
    if (json === undefined || json === null) {
        return json;
    }
    const internalType = targetClass;
    const serializer = targetClass && findTypeSerializer(targetClass);
    return unserializeImpl(json, serializer || internalType || null, options);
}
//# sourceMappingURL=unserialize.js.map