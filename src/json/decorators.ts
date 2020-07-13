import {AssignableType, ForwardRefFn, Type} from "../core";
import {InternalType} from "./InternalType";
import {PropertyConfig} from "./PropertyConfig";
import {registerType} from "./registerType";
import {serializerForType} from "./serialization";
import {SerializationOptions} from "./SerializationOptions";
import {Serializer} from "./Serializer";
import {fromJsonImpl, toJsonImpl} from "./toFromJsonImpl";
import "reflect-metadata";

export function setupSerialization(type: Type<any>) {

	const internalType = type as InternalType;
	internalType.__jsonSerialization = true;

	if (!type.prototype.hasOwnProperty("toJSON")) {
		internalType.__jsonToJson = true;
		type.prototype.toJSON = function () {
			return toJsonImpl.call(this);
		}
	}

	if (!type.hasOwnProperty("fromJSON")) {
		internalType.__jsonFromJson = true;
		internalType.fromJSON = function (json: any) {
			return fromJsonImpl.call(this, json);
		}
	}
}

export type SubtypeMatcher = (json: any) => Type<any> | ForwardRefFn;

export interface SubtypeInfo {
	matcher?: SubtypeMatcher;
	property?: string;
	value?: (value: any) => boolean | any;
	type?: ForwardRefFn | Type<any>;
}

export function Subtype(matcher: SubtypeMatcher);

export function Subtype(property: string, value: any, typeRef: ForwardRefFn | Type<any>);

export function Subtype(propertyOrMatcher: string | SubtypeMatcher, value?: any, typeRef?: ForwardRefFn | Type<any>) {
	return function (target: Type<any>) {
		setupSerialization(target.constructor);

		let types: SubtypeInfo[];

		if (target.hasOwnProperty("__json__subtypes")) {
			types = Object.getOwnPropertyDescriptor(target, "__json__subtypes").value as SubtypeInfo[];
		} else {
			types = [];
			Object.defineProperty(target, "__json__subtypes", { value: types, enumerable: false, configurable: false });
		}

		types.push({
			property: typeof propertyOrMatcher === "string" ? propertyOrMatcher : undefined,
			value: value,
			type: typeRef,
			matcher: typeof propertyOrMatcher === "function" ? propertyOrMatcher : undefined
		});
	}
}

export function Subtypes(matcher: SubtypeMatcher);

export function Subtypes(types: SubtypeInfo[]);

export function Subtypes(matcherOrTypes: SubtypeInfo[] | SubtypeMatcher) {
	return function (target: Function) {
		setupSerialization(target.constructor);

		let allTypes: SubtypeInfo[];

		if (target.hasOwnProperty("__json__subtypes")) {
			allTypes = Object.getOwnPropertyDescriptor(target, "__json__subtypes").value as SubtypeInfo[];
		} else {
			allTypes = [];
			Object.defineProperty(target, "__json__subtypes", {value: allTypes, enumerable: false, configurable: false});
		}

		if (Array.isArray(matcherOrTypes)) {
			for (const type of matcherOrTypes) {
				allTypes.push(type);
			}
		} else if (typeof matcherOrTypes === "function") {
			allTypes.push({matcher: matcherOrTypes});
		}
	}
}


export function Property(type: Function | Serializer): Function;

export function Property(type: Function | Serializer, jsonName?: string): Function;

export function Property(type: Function | Serializer, options?: SerializationOptions): Function;

export function Property(type: Function | Serializer, jsonName: string, options?: SerializationOptions): Function;

export function Property(type: Function | Serializer, nameOrOptions?: string | SerializationOptions, options?: SerializationOptions): Function {

	return function (target: any, propertyName: string, propertyDescriptor?: PropertyDescriptor) {

		let constructor = target.constructor;
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

		if (constructor.hasOwnProperty("__jsonProperties")) {
			properties = Object.getOwnPropertyDescriptor(constructor, "__jsonProperties").value;
		} else {
			properties = {};
			Object.defineProperty(constructor, "__jsonProperties", { value: properties, enumerable: false, configurable: false });
		}

		properties[propertyName] = config;
	}
}

export function Ignore(target: any, propertyName: string, propertyDescriptor?: PropertyDescriptor) {

	let constructor = target;

	setupSerialization(constructor);

	let properties: Array<string>;

	if (constructor.hasOwnProperty("__jsonIgnoredProperties")) {
		properties = Object.getOwnPropertyDescriptor(constructor, "__jsonIgnoredProperties").value;
	} else {
		properties = [];
		Object.defineProperty(constructor, "__jsonIgnoredProperties", { value: properties, enumerable: false, configurable: false });
	}

	properties.push(propertyName);
}

/**
 * Marks a class, that is to be serialized by json serialization engine.
 */
export function Serialize(classConstructor: Function) {
	setupSerialization(classConstructor);
}

export function jsonSerialize() {
	return function(classType: Type) {
		setupSerialization(classType);
	}
}

export function jsonType(name: string, options?: {replace?: boolean}) {
	return function (classType: Type) {
		registerType(name, classType, options);
		(classType as InternalType).__jsonTypeName = name;
	}
}

export function jsonIgnore() {
	return function(classPrototype: any, propertyName: string, propertyDescriptor?: PropertyDescriptor) {

		const internalType = classPrototype.constructor as InternalType;
		setupSerialization(internalType);

		const properties = internalType.__jsonIgnoredProperties = internalType.__jsonIgnoredProperties || [];
		properties.push(propertyName);
	}
}

export function jsonProperty(type?: Function | Serializer): Function;

export function jsonProperty(type: Function | Serializer, options?: SerializationOptions): Function;

export function jsonProperty(type: Function | Serializer, jsonName?: string): Function;

export function jsonProperty(type: Function | Serializer, jsonName: string, options?: SerializationOptions): Function;

export function jsonProperty(jsonName?: string): Function;

export function jsonProperty(jsonName: string, options?: SerializationOptions): Function;

export function jsonProperty(): Function {

	let jsonType: Type | Serializer;
	let jsonName: string;
	let options: SerializationOptions;

	for (let i = 0; i < arguments.length; i++) {

		if (arguments[i] instanceof Serializer || typeof arguments[i] === "function") {
			jsonType = arguments[i];
		} else if (typeof arguments[i] === "string") {
			jsonName = arguments[i];
		} else if (typeof arguments[i] === "object") {
			options = arguments[i];
		}
	}

	return function (classPrototype: any, propertyName: string, propertyDescriptor?: PropertyDescriptor) {

		if (!jsonType) {
			jsonType = Reflect.getMetadata("design:type", classPrototype, propertyName);
		}

		const type = classPrototype.constructor as InternalType;
		const config = Object.assign({propertyType: jsonType, propertyJsonName: jsonName}, options) as PropertyConfig;

		setupSerialization(type);

		const properties = type.__jsonProperties = type.__jsonProperties || [];
		properties[propertyName] = config;
	}
}
