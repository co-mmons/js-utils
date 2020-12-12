"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnumAsStringSerializer = void 0;
const core_1 = require("../../core");
const Serializer_1 = require("../Serializer");
/**
 * Serializes enum as a string. By default native enums are serialized as numbers, @{link Enum} is serialized to types json.
 */
class EnumAsStringSerializer extends Serializer_1.Serializer {
    constructor(enumClass) {
        super();
        this.enumClass = enumClass;
    }
    serialize(value, options) {
        if (!this.isUndefinedOrNull(value)) {
            if (value instanceof core_1.Enum) {
                return value.name;
            }
            return this.enumClass[value];
        }
        else {
            return value;
        }
    }
    unserialize(value, options) {
        if (value && this.enumClass.fromJSON) {
            return this.enumClass.fromJSON(value);
        }
        else if (value && typeof value === "string") {
            return this.enumClass[value];
        }
        else {
            return value;
        }
    }
}
exports.EnumAsStringSerializer = EnumAsStringSerializer;
//# sourceMappingURL=EnumAsStringSerializer.js.map