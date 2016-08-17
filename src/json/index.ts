export abstract class Serializer {

	public serialize (object: any, options?: SerializationOptions): any {
		return object;
	}

	public abstract unserialize (json: any, options?: SerializationOptions) : any;

	protected isUndefinedOrNull (value: any) {
		return value === undefined || value === null;
	}

	protected serializeUndefinedOrNull (value: any, options?: SerializationOptions) : any {
		return value;
	}

	protected unserializeUndefinedOrNull (value: any, options?: SerializationOptions): any {
		if (options && options.disallowUndefinedOrNull) {
			throw "Undefined/null value is not allowed";
		} else {
			return value;
		}
	}

}

export interface SerializationOptions {
	notStrict?: boolean;
	disallowUndefinedOrNull?: boolean;
	ignoreErrors?: boolean;
	[propName: string]: any;
}


import {StringSerializer} from "./string-serializer";
import {NumberSerializer} from "./number-serializer";
import {BooleanSerializer} from "./boolean-serializer";
import {ArrayOfAny} from "./array-serializer";


function setupSerialization (constructor: any) {

	constructor["__json__serialization"] = true;

	if (!constructor.hasOwnProperty("toJSON")) {
		constructor.toJSON = function () {
			return toJsonImpl(this, constructor);
		}
	}

	if (!constructor.hasOwnProperty("fromJSON")) {
		constructor.fromJSON = function (json: any) {
			return fromJsonImpl(this, constructor, json);
		}
	}
}

function toJsonImpl (object: any, prototype: any) {

	let json: any = {};

	let prototypeOfPrototype = prototype ? Object.getPrototypeOf(prototype) : null;
	let properties = prototype["__json__properties"];
	let ignoredProperties = prototype["__json__ignoredProperties"] as Array<String>;

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

function fromJsonImpl (instance: any, prototype: any, json: any) {

	let prototypeOfPrototype = prototype ? Object.getPrototypeOf(prototype) : undefined;

	if (prototype && prototypeOfPrototype && prototypeOfPrototype["fromJSON"]) {
		prototypeOfPrototype.fromJSON.apply(instance, [json]);
	}

	let properties = prototype["__json__properties"];
	let ignoredProperties = prototype["__json__ignoredProperties"] as Array<String>;

	for (let propertyName in properties) {

		if (!ignoredProperties || ignoredProperties.indexOf(propertyName) < 0) {
			let propertyConfig = properties[propertyName] as PropertyConfig;
			let jsonName = propertyConfig.propertyJsonName ? propertyConfig.propertyJsonName : propertyName;
			let serializer = propertyConfig.propertyType instanceof Serializer ? propertyConfig.propertyType as Serializer : serializerForType(propertyConfig.propertyType as Function);
			instance[propertyName] = serializer.unserialize(json[jsonName], propertyConfig);
		}
	}

}

function serializerForType (type: Function) : Serializer {
	if (type === Boolean) return BooleanSerializer.INSTANCE;
	if (type === Number) return NumberSerializer.INSTANCE;
	if (type === String) return StringSerializer.INSTANCE;
	if (type === Array) return ArrayOfAny;
	return OBJECT_SERIALIZER;
}

class ObjectSerializer extends Serializer {

	serialize (object: any, options?: SerializationOptions) : any {

		if (object === null || object === undefined) return object;

		if (object.toJSON) {
			return object.toJSON();
		}

		return object;
	}

	unserialize (json: any, options?: SerializationOptions) : any {

		if (this.isUndefinedOrNull(json)) return json;

		if (options && typeof options["propertyType"] === "function") {
			return unserialize(json, options["propertyType"]);
		}

		return undefined;
	}
}

const OBJECT_SERIALIZER = new ObjectSerializer();














export function serialize (object: any) : any {
	if (!object) return null;
	if (object.toJSON) {
		return object.toJSON();
	} else {
		return object;
	}
}

export function unserialize <T> (json: any, targetClass: Function) : T {

	let serializer: Serializer = serializerForType(targetClass);
	if (serializer && serializer !== OBJECT_SERIALIZER) return serializer.unserialize(json);

	let prototype: any = targetClass.prototype;
	if (prototype.hasOwnProperty("fromJSON")) {
		let instance = Object.create(prototype);
		instance.fromJSON(json);
		return instance;
	} else {
		let instance = Object.create(prototype);
		targetClass.apply(instance, [json]);
		return instance;
	}
}

interface PropertyConfig extends SerializationOptions {
	propertyType?: Function | Serializer;
	propertyJsonName?: string;
}

export function Property (type: Function | Serializer) : Function;

export function Property (type: Function | Serializer, jsonName?: string) : Function;

export function Property (type: Function | Serializer, options?: SerializationOptions) : Function;

export function Property (type: Function | Serializer, jsonName: string, options?: SerializationOptions) : Function;

export function Property (type: Function | Serializer, nameOrOptions?: string | SerializationOptions, options?: SerializationOptions) : Function {

	return function (target: any, propertyName: string, propertyDescriptor?: PropertyDescriptor) {

		let constructor = target;
		let config: PropertyConfig = {propertyType: type};

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
			Object.defineProperty(constructor, "__json__properties", {value: properties, enumerable: false, configurable: false});
		}

		properties[propertyName] = config;
	}
}

export function Ignore (target: any, propertyName: string, propertyDescriptor?: PropertyDescriptor) {

	let constructor = target;

	setupSerialization(constructor);

	let properties: Array<string>;

	if (constructor.hasOwnProperty("__json__ignoreProperties")) {
		properties = Object.getOwnPropertyDescriptor(constructor, "__json__ignoreProperties").value;
	} else {
		properties = [];
		Object.defineProperty(constructor, "__json__ignoreProperties", {value: properties, enumerable: false, configurable: false});
	}

	properties.push(propertyName);
}
