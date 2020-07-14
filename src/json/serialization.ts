import {resolveForwardRef, Type} from "../core";
import {findTypeByName} from "./findTypeByName";
import {InternalType} from "./InternalType";
import {SerializationOptions} from "./SerializationOptions";
import {Serializer} from "./Serializer";

export function serialize(object: any, options?: SerializationOptions): any {

    if (object && object.toJSON) {
        return object.toJSON();
    } else if (Array.isArray(object)) {
        return ArraySerializer.ofAny.serialize(object, options);
    } else if (typeof object === "boolean" || object instanceof Boolean) {
        return BooleanSerializer.instance.serialize(object, options);
    } else if (typeof object === "number" || object instanceof Number) {
        return NumberSerializer.instance.serialize(object, options);
    } else if (typeof object === "string" || object instanceof String) {
        return StringSerializer.instance.serialize(object, options);
    } else if (object instanceof Date) {
        return DateSerializer.instance.serialize(object, options);
    }

    return ObjectSerializer.instance.serialize(object, options);
}

export function unserialize<T>(json: any, targetClass?: Type, options?: SerializationOptions): T {

    if (json === undefined || json === null) {
        return json;
    }

    if (targetClass) {

        const internalType = targetClass as InternalType;

        const serializer: Serializer = serializerForType(targetClass);
        if (serializer && serializer !== ObjectSerializer.instance) {
            return serializer.unserialize(json, options);
        }

        if (targetClass.prototype["fromJSON"]) {
            const instance = Object.create(targetClass.prototype);
            instance.fromJSON(json, options);
            return instance;
        } else if (internalType.fromJSON) {
            return internalType.fromJSON(json, options);
        } else if (targetClass !== Object) {
            return new (targetClass as any)(json);
        }
    }

    if (typeof json === "object") {

        const knownType = findTypeByName(json);
        if (knownType) {
            return unserialize(json, knownType);
        }

        const niu = {};

        for (const property of Object.keys(json)) {

            const value = json[property];

            if (typeof value === "object") {
                const knownType = findTypeByName(value);
                if (knownType) {
                    niu[property] = unserialize(value, knownType);
                    continue;
                }
            }

            niu[property] = unserialize(value);
        }

        return niu as T;

    } else if (Array.isArray(json)) {
        return ArraySerializer.ofAny.unserialize(json, options);
    }

    return json;
}

export function serializerForType(type: Type): Serializer {
    if (type === Boolean) return BooleanSerializer.instance;
    if (type === Number) return NumberSerializer.instance;
    if (type === String) return StringSerializer.instance;
    if (type === Array) return ArraySerializer.ofAny;
    if (type === Date) return DateSerializer.instance;
    return ObjectSerializer.instance;
}

export class ArraySerializer<T> extends Serializer<T[]> {

    static readonly ofAny = new ArraySerializer<any>();
    static readonly ofString = new ArraySerializer(String);
    static readonly ofNumber = new ArraySerializer(Number);
    static readonly ofBoolean = new ArraySerializer(Boolean);

    constructor(valueType?: Type<T> | Serializer<T>) {
        super();

        if (arguments.length == 1 && !valueType) {
            throw "Value type passed to Json Array Serializer is undefined - check, whether class reference cycle";
        }

        this.valueType = valueType;
    }

    private valueType: Function | Serializer;

    serialize(value: any, options?: SerializationOptions): any {

        let valueType = resolveForwardRef(this.valueType);

        if (this.isUndefinedOrNull(value)) {
            return this.serializeUndefinedOrNull(value, options);

        } else if (Array.isArray(value)) {

            let array: any[] = [];

            if (valueType instanceof Serializer) {

                for (let i of value) {
                    array.push((valueType as Serializer).serialize(i, options));
                }

            } else {
                for (let i of value) {
                    array.push(serialize(i));
                }
            }

            return array;

        } else if (!options || !options.ignoreErrors) {
            throw 'Cannot serialize "' + value + " as array";

        } else {
            return undefined;
        }
    }

    unserialize(json: any, options?: SerializationOptions): any {

        let valueType = this.valueType && resolveForwardRef(this.valueType);

        if (Array.isArray(json)) {
            const array: any[] = [];

            if (valueType) {

                if (valueType instanceof Serializer) {

                    for (const i of json) {
                        array.push((valueType as Serializer).unserialize(i));
                    }

                } else {
                    for (const i of json) {
                        array.push(unserialize(i, valueType as Type<any>));
                    }
                }

            } else {

                for (const val of json) {
                    array.push(unserialize(val));
                }
            }

            return array;

        } else if (this.isUndefinedOrNull(json)) {
            return this.unserializeUndefinedOrNull(json, options);

        } else if (!options || !options.ignoreErrors) {
            throw 'Cannot unserialize "' + json + " to array.";

        } else {
            return undefined;
        }
    }
}

class ObjectSerializer extends Serializer {

    static readonly instance = new ObjectSerializer();

    serialize(object: any, options?: SerializationOptions): any {

        if (object === null || object === undefined) return object;

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

    unserialize(json: any, options?: SerializationOptions): any {

        if (this.isUndefinedOrNull(json)) {
            return json;

        } else if (options && typeof options["propertyType"] === "function") {
            return unserialize(json, options["propertyType"]);
        } else {
            return unserialize(json, findTypeByName(json));
        }
    }
}

class BooleanSerializer extends Serializer {

    static readonly instance = new BooleanSerializer();

    serialize(value: any, options?: SerializationOptions): any {
        if (this.isUndefinedOrNull(value)) {
            return this.serializeUndefinedOrNull(value, options);
        } else if (typeof value === "boolean") {
            return value;
        } else if (options && options.notStrict) {
            return value ? true : false;
        } else if (!options || !options.ignoreErrors) {
            throw 'Cannot serialize "' + value + " as boolean";
        } else {
            return undefined;
        }
    }

    unserialize(value: any, options?: SerializationOptions): any {
        if (typeof value === "boolean") {
            return value;
        } else if (this.isUndefinedOrNull(value)) {
            return this.unserializeUndefinedOrNull(value, options);
        } else if (options && options.notStrict) {
            return value ? true : false;
        } else if (!options || !options.ignoreErrors) {
            throw 'Cannot unserialize "' + value + " to boolean.";
        } else {
            return undefined;
        }
    }

}

class NumberSerializer extends Serializer {

    static readonly instance = new NumberSerializer();

    serialize(value: any, options?: SerializationOptions): any {
        if (this.isUndefinedOrNull(value)) {
            return this.serializeUndefinedOrNull(value, options);
        } else if (typeof value === "number") {
            return value;
        } else if (options && options.notStrict && typeof value === "string") {
            return parseFloat(value);
        } else if (!options || !options.ignoreErrors) {
            throw 'Cannot serialize "' + value + " as number";
        } else {
            return undefined;
        }
    }

    unserialize(value: any, options?: SerializationOptions): any {
        if (typeof value === "number") {
            return value;
        } else if (this.isUndefinedOrNull(value)) {
            return this.unserializeUndefinedOrNull(value, options);
        } else if (options && options.notStrict) {
            return parseFloat(value);
        } else if (!options || !options.ignoreErrors) {
            throw 'Cannot unserialize "' + value + " to number.";
        } else {
            return undefined;
        }
    }

}

class StringSerializer extends Serializer {

    static readonly instance = new StringSerializer();

    serialize(value: any, options?: SerializationOptions): any {
        if (this.isUndefinedOrNull(value)) {
            return this.serializeUndefinedOrNull(value, options);
        } else if (typeof value === "string") {
            return value;
        } else if (options && options.notStrict) {
            return value + "";
        } else if (!options || !options.ignoreErrors) {
            throw 'Cannot serialize "' + value + " as string";
        } else {
            return undefined;
        }
    }

    unserialize(value: any, options?: SerializationOptions): any {
        if (typeof value === "string") {
            return value;
        } else if (this.isUndefinedOrNull(value)) {
            return this.unserializeUndefinedOrNull(value, options);
        } else if (options && options.notStrict) {
            return value + "";
        } else if (!options || !options.ignoreErrors) {
            throw 'Cannot unserialize "' + value + " to string.";
        } else {
            return undefined;
        }
    }

}

class DateSerializer extends Serializer {

    static readonly instance = new DateSerializer();

    serialize(value: any, options?: SerializationOptions): any {
        if (this.isUndefinedOrNull(value)) {
            return this.serializeUndefinedOrNull(value, options);
        } else if (value instanceof Date) {
            return value;
        } else if (options && options.notStrict && typeof value == "number") {
            return new Date(new Date().setTime(value));
        } else if (!options || !options.ignoreErrors) {
            throw 'Cannot serialize "' + value + " as Date";
        } else {
            return undefined;
        }
    }

    unserialize(value: any, options?: SerializationOptions): any {

        if (value instanceof Date) {
            return value;

        } else if (typeof value == "string") {
            return new Date(value);

        } else if (typeof value == "number" && options && options.notStrict) {
            return new Date(new Date().setTime(value));

        } else if (this.isUndefinedOrNull(value)) {
            return this.unserializeUndefinedOrNull(value, options);

        } else if (!options || !options.ignoreErrors) {
            throw 'Cannot unserialize "' + value + " to Date.";

        } else {
            return undefined;
        }
    }

}
