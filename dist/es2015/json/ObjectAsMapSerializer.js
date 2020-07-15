"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectAsMapSerializer = void 0;
const serialization_1 = require("./serialization");
const Serializer_1 = require("./Serializer");
/**
 * Serializer of objects, that should be treated as Maps, where key is always a string and value of given type.
 */
class ObjectAsMapSerializer extends Serializer_1.Serializer {
    constructor(valueType) {
        super();
        this.valueType = valueType;
    }
    serialize(value, options) {
        if (this.isUndefinedOrNull(value)) {
            return this.serializeUndefinedOrNull(value, options);
        }
        else if (typeof value === "object") {
            let json = {};
            for (let i in value) {
                json[i] = this.valueType instanceof Serializer_1.Serializer ? this.valueType.serialize(value[i]) : serialization_1.serialize(value[i]);
            }
            return json;
        }
        else if (!options || !options.ignoreErrors) {
            throw 'Cannot serialize "' + value + " as object";
        }
        else {
            return undefined;
        }
    }
    unserialize(value, options) {
        if (typeof value === "object") {
            if (this.valueType) {
                let object = {};
                for (let i in value) {
                    object[i] = this.valueType instanceof Serializer_1.Serializer ? this.valueType.unserialize(value[i]) : serialization_1.unserialize(value[i], this.valueType);
                }
                return object;
            }
            else {
                return value;
            }
        }
        else if (this.isUndefinedOrNull(value)) {
            return this.unserializeUndefinedOrNull(value, options);
        }
        else if (!options || !options.ignoreErrors) {
            throw 'Cannot unserialize "' + value + " to object.";
        }
        else {
            return undefined;
        }
    }
}
exports.ObjectAsMapSerializer = ObjectAsMapSerializer;
//# sourceMappingURL=ObjectAsMapSerializer.js.map