import { findTypeSerializer } from "./findTypeSerializer";
import { identifyType } from "./identifyType";
import { Serializer } from "./Serializer";
export function serializeImpl(value, type, options) {
    return serializeImplWithSerializer(value, type, options);
}
function serializeImplWithSerializer(value, typeOrSerializer, options) {
    if (value === null || value === undefined) {
        return value;
    }
    else {
        const array = Array.isArray(value) ? [] : undefined;
        const serializer = typeOrSerializer instanceof Serializer ? typeOrSerializer : findTypeSerializer(typeOrSerializer ? typeOrSerializer : (!array ? identifyType(value) : undefined), options === null || options === void 0 ? void 0 : options.typeProviders);
        for (const i of array ? value : [value]) {
            if (array && (i === undefined || i === null)) {
                array.push(i);
                continue;
            }
            let serialized = i;
            if (Array.isArray(i)) {
                serialized = serializeImplWithSerializer(i, serializer, options);
            }
            else if (serializer) {
                serialized = serializer.serialize(i, options);
            }
            else if (i.toJSON) {
                serialized = i.toJSON();
            }
            if (array) {
                array.push(serialized);
            }
            else {
                return serialized;
            }
        }
        if (array) {
            return array;
        }
    }
}
//# sourceMappingURL=serializeImpl.js.map