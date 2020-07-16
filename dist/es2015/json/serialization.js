"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArraySerializer = exports.serializerForType = exports.unserialize = exports.serialize = void 0;
const core_1 = require("../core");
const findTypeByName_1 = require("./findTypeByName");
const Serializer_1 = require("./Serializer");
function serialize(object, options) {
    if (object && object.toJSON) {
        return object.toJSON(options);
    }
    else if (Array.isArray(object)) {
        return ArraySerializer.ofAny.serialize(object, options);
    }
    else if (typeof object === "boolean" || object instanceof Boolean) {
        return BooleanSerializer.instance.serialize(object, options);
    }
    else if (typeof object === "number" || object instanceof Number) {
        return NumberSerializer.instance.serialize(object, options);
    }
    else if (typeof object === "string" || object instanceof String) {
        return StringSerializer.instance.serialize(object, options);
    }
    else if (object instanceof Date) {
        return DateSerializer.instance.serialize(object, options);
    }
    return ObjectSerializer.instance.serialize(object, options);
}
exports.serialize = serialize;
function unserialize(json, targetClass, options) {
    if (json === undefined || json === null) {
        return json;
    }
    if (targetClass) {
        const internalType = targetClass;
        const serializer = serializerForType(targetClass);
        if (serializer && serializer !== ObjectSerializer.instance) {
            return serializer.unserialize(json, options);
        }
        if (targetClass.prototype["fromJSON"]) {
            const instance = Object.create(targetClass.prototype);
            instance.fromJSON(json, options);
            return instance;
        }
        else if (internalType.fromJSON) {
            return internalType.fromJSON(json, options);
        }
        else if (targetClass !== Object) {
            return new targetClass(json);
        }
    }
    if (typeof json === "object") {
        const knownType = findTypeByName_1.findTypeByName(json);
        if (knownType) {
            return unserialize(json, knownType);
        }
        const niu = {};
        for (const property of Object.keys(json)) {
            const value = json[property];
            if (typeof value === "object" && value) {
                const knownType = findTypeByName_1.findTypeByName(value);
                if (knownType) {
                    niu[property] = unserialize(value, knownType, options);
                    continue;
                }
            }
            niu[property] = unserialize(value, undefined, options);
        }
        return niu;
    }
    else if (Array.isArray(json)) {
        return ArraySerializer.ofAny.unserialize(json, options);
    }
    return json;
}
exports.unserialize = unserialize;
function serializerForType(type) {
    if (type === Boolean)
        return BooleanSerializer.instance;
    if (type === Number)
        return NumberSerializer.instance;
    if (type === String)
        return StringSerializer.instance;
    if (type === Array)
        return ArraySerializer.ofAny;
    if (type === Date)
        return DateSerializer.instance;
    return ObjectSerializer.instance;
}
exports.serializerForType = serializerForType;
class ArraySerializer extends Serializer_1.Serializer {
    constructor(valueType) {
        super();
        if (arguments.length == 1 && !valueType) {
            throw "Value type passed to Json Array Serializer is undefined - check, whether class reference cycle";
        }
        this.valueType = valueType;
    }
    serialize(value, options) {
        let valueType = core_1.resolveForwardRef(this.valueType);
        if (this.isUndefinedOrNull(value)) {
            return this.serializeUndefinedOrNull(value, options);
        }
        else if (Array.isArray(value)) {
            let array = [];
            if (valueType instanceof Serializer_1.Serializer) {
                for (let i of value) {
                    array.push(valueType.serialize(i, options));
                }
            }
            else {
                for (let i of value) {
                    array.push(serialize(i, options));
                }
            }
            return array;
        }
        else if (!options || !options.ignoreErrors) {
            throw 'Cannot serialize "' + value + " as array";
        }
        else {
            return undefined;
        }
    }
    unserialize(json, options) {
        let valueType = this.valueType && core_1.resolveForwardRef(this.valueType);
        if (Array.isArray(json)) {
            const array = [];
            if (valueType) {
                if (valueType instanceof Serializer_1.Serializer) {
                    for (const i of json) {
                        array.push(valueType.unserialize(i, options));
                    }
                }
                else {
                    for (const i of json) {
                        array.push(unserialize(i, valueType, options));
                    }
                }
            }
            else {
                for (const val of json) {
                    array.push(unserialize(val, undefined, options));
                }
            }
            return array;
        }
        else if (this.isUndefinedOrNull(json)) {
            return this.unserializeUndefinedOrNull(json, options);
        }
        else if (!options || !options.ignoreErrors) {
            throw 'Cannot unserialize "' + json + " to array.";
        }
        else {
            return undefined;
        }
    }
}
exports.ArraySerializer = ArraySerializer;
ArraySerializer.ofAny = new ArraySerializer();
ArraySerializer.ofString = new ArraySerializer(String);
ArraySerializer.ofNumber = new ArraySerializer(Number);
ArraySerializer.ofBoolean = new ArraySerializer(Boolean);
class ObjectSerializer extends Serializer_1.Serializer {
    serialize(object, options) {
        if (object === null || object === undefined)
            return object;
        if (object.toJSON) {
            object = object.toJSON(options);
        }
        /*
        if (typeof object == "object") {

            for (let k in object) {
                if (object[k] === undefined || object[k] === null) {
                    delete object[k];
                }
            }

        }*/
        return object;
    }
    unserialize(json, options) {
        if (this.isUndefinedOrNull(json)) {
            return json;
        }
        else if (options && typeof (options === null || options === void 0 ? void 0 : options["propertyType"]) === "function") {
            return unserialize(json, options["propertyType"], options);
        }
        else {
            return unserialize(json, findTypeByName_1.findTypeByName(json), options);
        }
    }
}
ObjectSerializer.instance = new ObjectSerializer();
class BooleanSerializer extends Serializer_1.Serializer {
    serialize(value, options) {
        if (this.isUndefinedOrNull(value)) {
            return this.serializeUndefinedOrNull(value, options);
        }
        else if (typeof value === "boolean") {
            return value;
        }
        else if (options && options.notStrict) {
            return value ? true : false;
        }
        else if (!options || !options.ignoreErrors) {
            throw 'Cannot serialize "' + value + " as boolean";
        }
        else {
            return undefined;
        }
    }
    unserialize(value, options) {
        if (typeof value === "boolean") {
            return value;
        }
        else if (this.isUndefinedOrNull(value)) {
            return this.unserializeUndefinedOrNull(value, options);
        }
        else if (options && options.notStrict) {
            return value ? true : false;
        }
        else if (!options || !options.ignoreErrors) {
            throw 'Cannot unserialize "' + value + " to boolean.";
        }
        else {
            return undefined;
        }
    }
}
BooleanSerializer.instance = new BooleanSerializer();
class NumberSerializer extends Serializer_1.Serializer {
    serialize(value, options) {
        if (this.isUndefinedOrNull(value)) {
            return this.serializeUndefinedOrNull(value, options);
        }
        else if (typeof value === "number") {
            return value;
        }
        else if (options && options.notStrict && typeof value === "string") {
            return parseFloat(value);
        }
        else if (!options || !options.ignoreErrors) {
            throw 'Cannot serialize "' + value + " as number";
        }
        else {
            return undefined;
        }
    }
    unserialize(value, options) {
        if (typeof value === "number") {
            return value;
        }
        else if (this.isUndefinedOrNull(value)) {
            return this.unserializeUndefinedOrNull(value, options);
        }
        else if (options && options.notStrict) {
            return parseFloat(value);
        }
        else if (!options || !options.ignoreErrors) {
            throw 'Cannot unserialize "' + value + " to number.";
        }
        else {
            return undefined;
        }
    }
}
NumberSerializer.instance = new NumberSerializer();
class StringSerializer extends Serializer_1.Serializer {
    serialize(value, options) {
        if (this.isUndefinedOrNull(value)) {
            return this.serializeUndefinedOrNull(value, options);
        }
        else if (typeof value === "string") {
            return value;
        }
        else if (options && options.notStrict) {
            return value + "";
        }
        else if (!options || !options.ignoreErrors) {
            throw 'Cannot serialize "' + value + " as string";
        }
        else {
            return undefined;
        }
    }
    unserialize(value, options) {
        if (typeof value === "string") {
            return value;
        }
        else if (this.isUndefinedOrNull(value)) {
            return this.unserializeUndefinedOrNull(value, options);
        }
        else if (options && options.notStrict) {
            return value + "";
        }
        else if (!options || !options.ignoreErrors) {
            throw 'Cannot unserialize "' + value + " to string.";
        }
        else {
            return undefined;
        }
    }
}
StringSerializer.instance = new StringSerializer();
class DateSerializer extends Serializer_1.Serializer {
    serialize(value, options) {
        if (this.isUndefinedOrNull(value)) {
            return this.serializeUndefinedOrNull(value, options);
        }
        else if (value instanceof Date) {
            return value;
        }
        else if (options && options.notStrict && typeof value == "number") {
            return new Date(new Date().setTime(value));
        }
        else if (!options || !options.ignoreErrors) {
            throw 'Cannot serialize "' + value + " as Date";
        }
        else {
            return undefined;
        }
    }
    unserialize(value, options) {
        if (value instanceof Date) {
            return value;
        }
        else if (typeof value == "string") {
            return new Date(value);
        }
        else if (typeof value == "number" && options && options.notStrict) {
            return new Date(new Date().setTime(value));
        }
        else if (this.isUndefinedOrNull(value)) {
            return this.unserializeUndefinedOrNull(value, options);
        }
        else if (!options || !options.ignoreErrors) {
            throw 'Cannot unserialize "' + value + " to Date.";
        }
        else {
            return undefined;
        }
    }
}
DateSerializer.instance = new DateSerializer();
//# sourceMappingURL=serialization.js.map