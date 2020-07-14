import {Type} from "../../core";
import {InternalType} from "../InternalType";
import {PropertyConfig} from "../PropertyConfig";
import {SerializationOptions} from "../SerializationOptions";
import {Serializer} from "../Serializer";
import {setupSerialization} from "../setupSerialization";
import "reflect-metadata";

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
