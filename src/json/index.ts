import { Serializer, SerializationOptions } from "./serializer";
import { StringSerializer } from "./string-serializer";
import { NumberSerializer } from "./number-serializer";
import { BooleanSerializer } from "./boolean-serializer";

export class ArraySerializer extends Serializer {

	constructor(valueType?: Function | Serializer) {
		super();
		this.valueType = valueType;
	}

	private valueType: Function | Serializer;

	public serialize(value: any, options?: SerializationOptions): any {
		
		if (this.isUndefinedOrNull(value)) {
			return this.serializeUndefinedOrNull(value, options);

		} else if (Array.isArray(value)) {

			let array: any[] = [];

			if (this.valueType instanceof Serializer) {

				for (let i of value) {
					array.push((this.valueType as Serializer).serialize(i, options));
				}

			} else {
				for (let i of value) {
					array.push(serialize(i, this.valueType as Function));
				}
			}

			return array;

		} else if (!options || !options.ignoreErrors) {
			throw 'Cannot serialize "' + value + " as array";

		} else {
			return undefined;
		}
	}

	public unserialize(value: any, options?: SerializationOptions): any {

		if (Array.isArray(value)) {

			if (this.valueType) {
				let array: any[] = [];

				if (this.valueType instanceof Serializer) {

					for (let i of value) {
						array.push((this.valueType as Serializer).unserialize(i));
					}

				} else {
					for (let i of value) {
						array.push(unserialize(i, this.valueType as Function));
					}
				}

				return array;

			} else {
				return value;
			}

		} else if (this.isUndefinedOrNull(value)) {
			return this.unserializeUndefinedOrNull(value, options);

		} else if (!options || !options.ignoreErrors) {
			throw 'Cannot unserialize "' + value + " to array.";
			
		} else {
			return undefined;
		}
	}
}

export const ArrayOfAny = new ArraySerializer();
export const ArrayOfString = new ArraySerializer(String);
export const ArrayOfNumber = new ArraySerializer(Number);

class ObjectSerializer extends Serializer {

	serialize(object: any, options?: SerializationOptions): any {

		if (object === null || object === undefined) return object;

		if (object.toJSON) {
			return object.toJSON();
		}

		return object;
	}

	unserialize(json: any, options?: SerializationOptions): any {

		if (this.isUndefinedOrNull(json)) return json;

		else if (options && typeof options["propertyType"] === "function") {
			return unserialize(json, options["propertyType"]);
		}

		return json;
	}
}

const OBJECT_SERIALIZER = new ObjectSerializer();



function toJsonImpl(object: any, prototype: any) {

	let json: any = {};

	let prototypeOfPrototype = prototype ? Object.getPrototypeOf(prototype) : null;
	let properties = prototype["__json__properties"];
	let ignoredProperties = prototype["__json__ignoredProperties"] as Array<string>;

	if (prototype && prototypeOfPrototype && prototypeOfPrototype["toJSON"]) {
		let prototypeJson = prototypeOfPrototype.toJSON.call(object);
		if (typeof prototypeJson === "object") {
			json = prototypeJson;
		}
	}

	for (let propertyName in properties) {

		if (!ignoredProperties || ignoredProperties.indexOf(propertyName) < 0) {
			let propertyConfig = properties[propertyName] as PropertyConfig;
			let propertyDescriptor = Object.getOwnPropertyDescriptor(object, propertyName) as PropertyDescriptor;
			//let propertyValue = propertyDescriptor && propertyDescriptor.get ? object[propertyName] : (propertyDescriptor ? propertyDescriptor.value : null);
			let propertyValue = object[propertyName];
			let jsonName = propertyConfig.propertyJsonName ? propertyConfig.propertyJsonName : propertyName;
			let serializer = propertyConfig.propertyType instanceof Serializer ? propertyConfig.propertyType as Serializer : serializerForType(propertyConfig.propertyType as Function);

			json[jsonName] = serializer.serialize(propertyValue, propertyConfig);
		}
	}

	return json;
}

function fromJsonImpl(instance: any, prototype: any, json: any) {

	let prototypeOfPrototype = prototype ? Object.getPrototypeOf(prototype) : undefined;

	if (prototype && prototypeOfPrototype && prototypeOfPrototype["fromJSON"]) {
		prototypeOfPrototype.fromJSON.apply(instance, [json]);
	}

	let properties = prototype["__json__properties"];
	let ignoredProperties = prototype["__json__ignoredProperties"] as Array<string>;

	for (let propertyName in properties) {

		if (!ignoredProperties || ignoredProperties.indexOf(propertyName) < 0) {
			let propertyConfig = properties[propertyName] as PropertyConfig;
			let jsonName = propertyConfig.propertyJsonName ? propertyConfig.propertyJsonName : propertyName;
			let serializer = propertyConfig.propertyType instanceof Serializer ? propertyConfig.propertyType as Serializer : serializerForType(propertyConfig.propertyType as Function);
			instance[propertyName] = serializer.unserialize(json[jsonName], propertyConfig);
		}
	}
}

function serializerForType(type: Function): Serializer {
	if (type === Boolean) return BooleanSerializer.INSTANCE;
	if (type === Number) return NumberSerializer.INSTANCE;
	if (type === String) return StringSerializer.INSTANCE;
	if (type === Array) return ArrayOfAny;
	return OBJECT_SERIALIZER;
}

function setupSerialization(constructor: any) {

	constructor["__json__serialization"] = true;

	if (!constructor.hasOwnProperty("toJSON") || constructor.hasOwnProperty("__json__toJSON")) {
		constructor["__json__toJSON"] = true;
		constructor.toJSON = function () {
			return toJsonImpl(this, constructor);
		}
	}

	if (!constructor.hasOwnProperty("fromJSON") || constructor.hasOwnProperty("__json__fromJSON")) {
		constructor["__json__fromJSON"] = true;
		constructor.fromJSON = function (json: any) {
			return fromJsonImpl(this, constructor, json);
		}
	}
}


interface SubtypeInfo {
	property: string;
	value: any;
	typeRef: Function;
}

export function Subtype(property: string, value: any, typeRef: Function) {
	return function (target: Function) {
		setupSerialization(target);

		let types: SubtypeInfo[];

		if (target.hasOwnProperty("__json__subtypes")) {
			types = Object.getOwnPropertyDescriptor(target, "__json__subtypes").value as SubtypeInfo[];
		} else {
			types = [];
			Object.defineProperty(target, "__json__subtypes", { value: types, enumerable: false, configurable: false });
		}

		types.push({ property: property, value: value, typeRef: typeRef });
	}
}


interface PropertyConfig extends SerializationOptions {
	propertyType?: Function | Serializer;
	propertyJsonName?: string;
}

export function Property(type: Function | Serializer): Function;

export function Property(type: Function | Serializer, jsonName?: string): Function;

export function Property(type: Function | Serializer, options?: SerializationOptions): Function;

export function Property(type: Function | Serializer, jsonName: string, options?: SerializationOptions): Function;

export function Property(type: Function | Serializer, nameOrOptions?: string | SerializationOptions, options?: SerializationOptions): Function {

	return function (target: any, propertyName: string, propertyDescriptor?: PropertyDescriptor) {

		let constructor = target;
		let config: PropertyConfig = { propertyType: type };

		if (typeof nameOrOptions === "string") {
			config.propertyJsonName = nameOrOptions;
		} else if (nameOrOptions) {
			Object.assign(config, nameOrOptions);
		}

		if (options) {
			Object.assign(config, options);
		}

		setupSerialization(constructor);

		let properties: any;

		if (constructor.hasOwnProperty("__json__properties")) {
			properties = Object.getOwnPropertyDescriptor(constructor, "__json__properties").value;
		} else {
			properties = {};
			Object.defineProperty(constructor, "__json__properties", { value: properties, enumerable: false, configurable: false });
		}

		properties[propertyName] = config;
	}
}

export function Ignore(target: any, propertyName: string, propertyDescriptor?: PropertyDescriptor) {

	let constructor = target;

	setupSerialization(constructor);

	let properties: Array<string>;

	if (constructor.hasOwnProperty("__json__ignoreProperties")) {
		properties = Object.getOwnPropertyDescriptor(constructor, "__json__ignoreProperties").value;
	} else {
		properties = [];
		Object.defineProperty(constructor, "__json__ignoreProperties", { value: properties, enumerable: false, configurable: false });
	}

	properties.push(propertyName);
}

/**
 * Marks a class, that is to be serialized by json serialization engine.
 */
export function Serialize(target: Function) {
	setupSerialization(target);
}

export function serialize(object: any, options?: SerializationOptions): any {
	return OBJECT_SERIALIZER.serialize(object, options);
}

export function unserialize<T>(json: any, targetClass: Function): T {

	let serializer: Serializer = serializerForType(targetClass);
	if (serializer && serializer !== OBJECT_SERIALIZER) return serializer.unserialize(json);

	let prototype: any = targetClass.prototype;

	// if type has subtypes, find apropriate subtype
	if (targetClass.hasOwnProperty("__json__subtypes")) {
		let subtypes = Object.getOwnPropertyDescriptor(targetClass, "__json__subtypes").value as SubtypeInfo[];
		for (let subtype of subtypes) {
			if (json[subtype.property] == subtype.value) {
				prototype = subtype.typeRef.call(null).prototype;
				break;
			}
		}
	}

	if (prototype["fromJSON"]) {
		let instance = Object.create(prototype);
		instance.fromJSON(json);
		return instance;
	} else if (targetClass !== Object) {
		let instance = Object.create(prototype);
		targetClass.apply(instance, [json]);
		return instance;
	}

	return json;
}