import {resolveForwardRef, Type} from "../core";
import {findTypeByName} from "./findTypeByName";

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

export function unserialize<T>(json: any, targetClass?: Type<any>, options?: SerializationOptions): T {

    if (json === undefined || json === null) {
        return json;
    }

    if (targetClass) {

        let serializer: Serializer = serializerForType(targetClass);
        if (serializer && serializer !== ObjectSerializer.instance) {
            return serializer.unserialize(json, options);
        }

        let prototype: any = targetClass.prototype;

        // if type has subtypes, find apropriate subtype
        if (targetClass.hasOwnProperty("__json__subtypes")) {
            const subtypes = Object.getOwnPropertyDescriptor(targetClass, "__json__subtypes").value/* as SubtypeInfo[]*/;
            for (const subtype of subtypes) {

                if (subtype.matcher) {

                    const match = subtype.matcher(json);
                    if (match) {
                        prototype = resolveForwardRef(match).prototype;
                        break;
                    }

                } else if (subtype.property && ((typeof subtype.value === "function" && subtype.value(json[subtype.property])) || (typeof subtype.value !== "function" && json[subtype.property] == subtype.value))) {
                    prototype = resolveForwardRef(subtype.type).prototype;
                    break;
                }
            }
        }

        if (prototype["fromJSON"]) {
            let instance = Object.create(prototype);
            instance.fromJSON(json, options);
            return instance;
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

export function serializerForType(type: Type<any>): Serializer {
    if (type === Boolean) return BooleanSerializer.instance;
    if (type === Number) return NumberSerializer.instance;
    if (type === String) return StringSerializer.instance;
    if (type === Array) return ArraySerializer.ofAny;
    if (type === Date) return DateSerializer.instance;
    return ObjectSerializer.instance;
}

export interface SerializationOptions {
    notStrict?: boolean;
    disallowUndefinedOrNull?: boolean;
    ignoreErrors?: boolean;
    [propName: string]: any;
}

export abstract class Serializer<T = any> {

    public serialize(object: any, options?: SerializationOptions): any {
        return object;
    }

    public abstract unserialize(json: any, options?: SerializationOptions): T;

    protected isUndefinedOrNull(value: any) {
        return value === undefined || value === null;
    }

    protected serializeUndefinedOrNull(value: any, options?: SerializationOptions): any {
        return value;
    }

    protected unserializeUndefinedOrNull(value: any, options?: SerializationOptions): any {
        if (options && options.disallowUndefinedOrNull) {
            throw "Undefined/null value is not allowed";
        } else {
            return value;
        }
    }

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

    public serialize(value: any, options?: SerializationOptions): any {

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

    public unserialize(json: any, options?: SerializationOptions): any {

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

    public serialize(value: any, options?: SerializationOptions): any {
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

    public unserialize(value: any, options?: SerializationOptions): any {
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

    public serialize(value: any, options?: SerializationOptions): any {
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

    public unserialize(value: any, options?: SerializationOptions): any {
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

    public serialize(value: any, options?: SerializationOptions): any {
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

    public unserialize(value: any, options?: SerializationOptions): any {
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

    public serialize(value: any, options?: SerializationOptions): any {
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

    public unserialize(value: any, options?: SerializationOptions): any {

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
