import {JsonSerializer} from "./json-serializers";

function setupJsonSerialization (constructor: any) {

	if (!constructor.hasOwnProperty("toJSON")) {
		constructor.toJSON = function () {
			return toJsonImpl(this, constructor);
		}
	}

}

function toJsonImpl (object: any, prototype: any) {

	let json = {};

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
			let propertyConfig = properties[propertyName] as JsonPropertyConfig;
			let propertyDescriptor = Object.getOwnPropertyDescriptor(object, propertyName) as PropertyDescriptor;
			//let propertyValue = propertyDescriptor && propertyDescriptor.get ? object[propertyName] : (propertyDescriptor ? propertyDescriptor.value : null);
			let propertyValue = object[propertyName];
			let jsonName = propertyConfig.name ? propertyConfig.name : propertyName;

			json[jsonName] = propertyConfig.serializer ? propertyConfig.serializer.serialize(propertyValue) : propertyValue;
		}
	}

	return json;
}


export interface JsonPropertyConfig {
	name?: string;
	serializer?: JsonSerializer;
}

export function JsonProperty ();

export function JsonProperty (jsonConfig: JsonPropertyConfig);

export function JsonProperty (jsonName: string);

export function JsonProperty (jsonConfig?: string | JsonPropertyConfig) {

	return function (target: any, propertyName: string, propertyDescriptor?: PropertyDescriptor) {

		let constructor = target;
		let config: JsonPropertyConfig = (typeof jsonConfig === "string") ? {name : jsonConfig} : (jsonConfig ? jsonConfig : {});

		setupJsonSerialization(constructor);

		let properties;

		if (constructor.hasOwnProperty("__json__properties")) {
			properties = Object.getOwnPropertyDescriptor(constructor, "__json__properties").value;
		} else {
			properties = {};
			Object.defineProperty(constructor, "__json__properties", {value: properties, enumerable: false, configurable: false});
		}

		properties[propertyName] = config;
	}
}

export function JsonIgnore (target: any, propertyName: string, propertyDescriptor?: PropertyDescriptor) {

	let constructor = target;

	setupJsonSerialization(constructor);

	let properties;

	if (constructor.hasOwnProperty("__json__ignoreProperties")) {
		properties = Object.getOwnPropertyDescriptor(constructor, "__json__ignoreProperties").value;
	} else {
		properties = [];
		Object.defineProperty(constructor, "__json__ignoreProperties", {value: properties, enumerable: false, configurable: false});
	}

	properties.push(propertyName);
}
