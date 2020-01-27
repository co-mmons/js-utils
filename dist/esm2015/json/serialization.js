import { resolveForwardRef } from "../core";
export function serialize(object, options) {
    if (object && object.toJSON) {
        return object.toJSON();
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
export function unserialize(json, targetClass, options) {
    if (json === undefined || json === null) {
        return json;
    }
    let serializer = serializerForType(targetClass);
    if (serializer && serializer !== ObjectSerializer.instance)
        return serializer.unserialize(json, options);
    let prototype = targetClass.prototype;
    // if type has subtypes, find apropriate subtype
    if (targetClass.hasOwnProperty("__json__subtypes")) {
        const subtypes = Object.getOwnPropertyDescriptor(targetClass, "__json__subtypes").value /* as SubtypeInfo[]*/;
        for (const subtype of subtypes) {
            if (subtype.matcher) {
                const match = subtype.matcher(json);
                if (match) {
                    prototype = resolveForwardRef(match).prototype;
                    break;
                }
            }
            else if (subtype.property && ((typeof subtype.value === "function" && subtype.value(json[subtype.property])) || (typeof subtype.value !== "function" && json[subtype.property] == subtype.value))) {
                prototype = resolveForwardRef(subtype.type).prototype;
                break;
            }
        }
    }
    if (prototype["fromJSON"]) {
        let instance = Object.create(prototype);
        instance.fromJSON(json, options);
        return instance;
    }
    else if (targetClass !== Object) {
        return new targetClass(json);
    }
    return json;
}
export function serializerForType(type) {
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
export class Serializer {
    serialize(object, options) {
        return object;
    }
    isUndefinedOrNull(value) {
        return value === undefined || value === null;
    }
    serializeUndefinedOrNull(value, options) {
        return value;
    }
    unserializeUndefinedOrNull(value, options) {
        if (options && options.disallowUndefinedOrNull) {
            throw "Undefined/null value is not allowed";
        }
        else {
            return value;
        }
    }
}
export class ArraySerializer extends Serializer {
    constructor(valueType) {
        super();
        if (arguments.length == 1 && !valueType) {
            throw "Value type passed to Json Array Serializer is undefined - check, whether class reference cycle";
        }
        this.valueType = valueType;
    }
    serialize(value, options) {
        let valueType = resolveForwardRef(this.valueType);
        if (this.isUndefinedOrNull(value)) {
            return this.serializeUndefinedOrNull(value, options);
        }
        else if (Array.isArray(value)) {
            let array = [];
            if (valueType instanceof Serializer) {
                for (let i of value) {
                    array.push(valueType.serialize(i, options));
                }
            }
            else {
                for (let i of value) {
                    array.push(serialize(i));
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
        let valueType = resolveForwardRef(this.valueType);
        if (Array.isArray(json)) {
            if (valueType) {
                let array = [];
                if (valueType instanceof Serializer) {
                    for (let i of json) {
                        array.push(valueType.unserialize(i));
                    }
                }
                else {
                    for (let i of json) {
                        array.push(unserialize(i, valueType));
                    }
                }
                return array;
            }
            else {
                return json;
            }
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
ArraySerializer.ofAny = new ArraySerializer();
ArraySerializer.ofString = new ArraySerializer(String);
ArraySerializer.ofNumber = new ArraySerializer(Number);
ArraySerializer.ofBoolean = new ArraySerializer(Boolean);
/**
 * @deprecated Use {@link ArraySerializer#ofAny}.
 */
export const ArrayOfAny = ArraySerializer.ofAny;
/**
 * @deprecated Use {@link ArraySerializer#ofString}.
 */
export const ArrayOfString = ArraySerializer.ofString;
/**
 * @deprecated Use {@link ArraySerializer#ofNumber}.
 */
export const ArrayOfNumber = ArraySerializer.ofNumber;
/**
 * @deprecated Use {@link ArraySerializer#ofBoolean}.
 */
export const ArrayOfBoolean = ArraySerializer.ofBoolean;
class ObjectSerializer extends Serializer {
    serialize(object, options) {
        if (object === null || object === undefined)
            return object;
        if (object.toJSON) {
            object = object.toJSON();
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
        if (this.isUndefinedOrNull(json))
            return json;
        else if (options && typeof options["propertyType"] === "function") {
            return unserialize(json, options["propertyType"]);
        }
        return json;
    }
}
ObjectSerializer.instance = new ObjectSerializer();
class BooleanSerializer extends Serializer {
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
class NumberSerializer extends Serializer {
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
class StringSerializer extends Serializer {
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
class DateSerializer extends Serializer {
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