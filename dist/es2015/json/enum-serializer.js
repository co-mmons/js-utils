"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const serialization_1 = require("./serialization");
/**
 * Serializes enum as a String. By default enums are serialized as numbers.
 */
class EnumAsStringSerializer extends serialization_1.Serializer {
    constructor(enumClass) {
        super();
        this.enumClass = enumClass;
    }
    serialize(value, options) {
        if (value !== undefined && value !== null) {
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
//# sourceMappingURL=enum-serializer.js.map