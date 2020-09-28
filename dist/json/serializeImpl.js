"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeImpl = void 0;
const findTypeSerializer_1 = require("./findTypeSerializer");
const identifyType_1 = require("./identifyType");
const Serializer_1 = require("./Serializer");
function serializeImpl(value, type, options) {
    return serializeImplWithSerializer(value, type, null, options);
}
exports.serializeImpl = serializeImpl;
function serializeImplWithSerializer(value, type, typeSerializer, options) {
    if (value === null || value === undefined) {
        return value;
    }
    else {
        const array = Array.isArray(value) ? [] : undefined;
        const serializer = typeSerializer instanceof Serializer_1.Serializer ? typeSerializer : (typeSerializer !== false && findTypeSerializer_1.findTypeSerializer(type ? type : (!array ? identifyType_1.identifyType(value) : undefined), options === null || options === void 0 ? void 0 : options.typeProviders));
        for (const i of array ? value : [value]) {
            if (array && (i === undefined || i === null)) {
                array.push(i);
                continue;
            }
            let serialized = i;
            if (Array.isArray(i)) {
                serialized = serializeImplWithSerializer(i, type, serializer || false, options);
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