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
        const newArray = Array.isArray(value) ? [] : undefined;
        const serializer = typeSerializer instanceof Serializer_1.Serializer ? typeSerializer : (typeSerializer !== false && (0, findTypeSerializer_1.findTypeSerializer)(type ? type : (!newArray ? (0, identifyType_1.identifyType)(value) : undefined), options === null || options === void 0 ? void 0 : options.typeProviders));
        for (const i of newArray ? value : [value]) {
            if (newArray && (i === undefined || i === null)) {
                newArray.push(i);
                continue;
            }
            let serialized = i;
            if (Array.isArray(i)) {
                serialized = serializeImplWithSerializer(i, type, serializer || false, options);
            }
            else if (serializer) {
                serialized = serializer.serialize(i, options);
            }
            else if (newArray) {
                serialized = serializeImpl(i, undefined, options);
            }
            else if (i.toJSON) {
                serialized = i.toJSON();
            }
            else if (typeof i === "object") {
                serialized = {};
                for (const p of Object.keys(i)) {
                    serialized[p] = serializeImpl(i[p], undefined, options);
                }
            }
            if (newArray) {
                newArray.push(serialized);
            }
            else {
                return serialized;
            }
        }
        if (newArray) {
            return newArray;
        }
    }
}
//# sourceMappingURL=serializeImpl.js.map