import {Type} from "../core";
import {SerializationOptions, Serializer, serializerForType} from "./serialization";

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
			let serializer = propertyConfig.propertyType instanceof Serializer ? propertyConfig.propertyType as Serializer : serializerForType(propertyConfig.propertyType as Type<any>);

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
			let serializer = propertyConfig.propertyType instanceof Serializer ? propertyConfig.propertyType as Serializer : serializerForType(propertyConfig.propertyType as Type<any>);
			instance[propertyName] = serializer.unserialize(json[jsonName], propertyConfig);
		}
	}
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