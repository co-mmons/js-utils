import { findTypeSerializer } from "../findTypeSerializer";
import { serializeImpl } from "../serializeImpl";
import { Serializer } from "../Serializer";
import { unserializeImpl } from "../unserializeImpl";
/**
 * Basic serializer.
 */
export class ObjectSerializer extends Serializer {
    constructor(type) {
        super();
        if (type && type !== Object && type !== Array) {
            this.type = type;
        }
    }
    serialize(object, options) {
        return serializeImpl(object, this.type, options);
    }
    unserialize(json, options) {
        return unserializeImpl(json, (this.type && findTypeSerializer(this.type, options === null || options === void 0 ? void 0 : options.typeProviders)) || this.type, options);
    }
}
(function (ObjectSerializer) {
    ObjectSerializer.instance = new ObjectSerializer();
    function getTypeSerializer(type, typeProviders) {
        const serializer = findTypeSerializer(type, typeProviders);
        if (serializer) {
            return serializer;
        }
        else {
            return new ObjectSerializer(type);
        }
    }
    ObjectSerializer.getTypeSerializer = getTypeSerializer;
})(ObjectSerializer || (ObjectSerializer = {}));
//# sourceMappingURL=ObjectSerializer.js.map