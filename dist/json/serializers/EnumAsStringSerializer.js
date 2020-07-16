"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnumAsStringSerializer = void 0;
const Serializer_1 = require("../Serializer");
/**
 * Serializes enum as a String. By default enums are serialized as numbers.
 */
class EnumAsStringSerializer extends Serializer_1.Serializer {
    constructor(enumClass) {
        super();
        this.enumClass = enumClass;
    }
    serialize(value, options) {
        if (!this.isUndefinedOrNull(value)) {
            return this.enumClass[value];
        }
        else {
            return undefined;
        }
    }
    unserialize(value, options) {
        if (value && typeof value === "string") {
            return this.enumClass[value];
        }
        else {
            return undefined;
        }
    }
}
exports.EnumAsStringSerializer = EnumAsStringSerializer;
//# sourceMappingURL=EnumAsStringSerializer.js.map