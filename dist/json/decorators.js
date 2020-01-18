"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const serialization_1 = require("./serialization");
function toJsonImpl(object, prototype) {
    let json = {};
    let prototypeOfPrototype = prototype ? Object.getPrototypeOf(prototype) : null;
    let properties = prototype["__json__properties"];
    let ignoredProperties = prototype["__json__ignoredProperties"];
    if (prototype && prototypeOfPrototype && prototypeOfPrototype["toJSON"]) {
        let prototypeJson = prototypeOfPrototype.toJSON.call(object);
        if (typeof prototypeJson === "object") {
            json = prototypeJson;
        }
    }
    for (let propertyName in properties) {
        if (!ignoredProperties || ignoredProperties.indexOf(propertyName) < 0) {
            let propertyConfig = properties[propertyName];
            let propertyDescriptor = Object.getOwnPropertyDescriptor(object, propertyName);
            //let propertyValue = propertyDescriptor && propertyDescriptor.get ? object[propertyName] : (propertyDescriptor ? propertyDescriptor.value : null);
            let propertyValue = object[propertyName];
            let jsonName = propertyConfig.propertyJsonName ? propertyConfig.propertyJsonName : propertyName;
            let serializer = propertyConfig.propertyType instanceof serialization_1.Serializer ? propertyConfig.propertyType : serialization_1.serializerForType(propertyConfig.propertyType);
            json[jsonName] = serializer.serialize(propertyValue, propertyConfig);
        }
    }
    return json;
}
function fromJsonImpl(instance, prototype, json) {
    let prototypeOfPrototype = prototype ? Object.getPrototypeOf(prototype) : undefined;
    if (prototype && prototypeOfPrototype && prototypeOfPrototype["fromJSON"]) {
        prototypeOfPrototype.fromJSON.apply(instance, [json]);
    }
    let properties = prototype["__json__properties"];
    let ignoredProperties = prototype["__json__ignoredProperties"];
    for (let propertyName in properties) {
        if (!ignoredProperties || ignoredProperties.indexOf(propertyName) < 0) {
            let propertyConfig = properties[propertyName];
            let jsonName = propertyConfig.propertyJsonName ? propertyConfig.propertyJsonName : propertyName;
            let serializer = propertyConfig.propertyType instanceof serialization_1.Serializer ? propertyConfig.propertyType : serialization_1.serializerForType(propertyConfig.propertyType);
            instance[propertyName] = serializer.unserialize(json[jsonName], propertyConfig);
        }
    }
}
function setupSerialization(constructor) {
    constructor["__json__serialization"] = true;
    if (!constructor.hasOwnProperty("toJSON") || constructor.hasOwnProperty("__json__toJSON")) {
        constructor["__json__toJSON"] = true;
        constructor.toJSON = function () {
            return toJsonImpl(this, constructor);
        };
    }
    if (!constructor.hasOwnProperty("fromJSON") || constructor.hasOwnProperty("__json__fromJSON")) {
        constructor["__json__fromJSON"] = true;
        constructor.fromJSON = function (json) {
            return fromJsonImpl(this, constructor, json);
        };
    }
}
function Subtype(propertyOrMatcher, value, typeRef) {
    return function (target) {
        setupSerialization(target);
        let types;
        if (target.hasOwnProperty("__json__subtypes")) {
            types = Object.getOwnPropertyDescriptor(target, "__json__subtypes").value;
        }
        else {
            types = [];
            Object.defineProperty(target, "__json__subtypes", { value: types, enumerable: false, configurable: false });
        }
        types.push({
            property: typeof propertyOrMatcher === "string" ? propertyOrMatcher : undefined,
            value: value,
            type: typeRef,
            matcher: typeof propertyOrMatcher === "function" ? propertyOrMatcher : undefined
        });
    };
}
exports.Subtype = Subtype;
function Subtypes(matcherOrTypes) {
    return function (target) {
        setupSerialization(target);
        let allTypes;
        if (target.hasOwnProperty("__json__subtypes")) {
            allTypes = Object.getOwnPropertyDescriptor(target, "__json__subtypes").value;
        }
        else {
            allTypes = [];
            Object.defineProperty(target, "__json__subtypes", { value: allTypes, enumerable: false, configurable: false });
        }
        if (Array.isArray(matcherOrTypes)) {
            for (const type of matcherOrTypes) {
                allTypes.push(type);
            }
        }
        else if (typeof matcherOrTypes === "function") {
            allTypes.push({ matcher: matcherOrTypes });
        }
    };
}
exports.Subtypes = Subtypes;
function Property(type, nameOrOptions, options) {
    return function (target, propertyName, propertyDescriptor) {
        let constructor = target;
        let config = { propertyType: type };
        if (typeof nameOrOptions === "string") {
            config.propertyJsonName = nameOrOptions;
        }
        else if (nameOrOptions) {
            Object.assign(config, nameOrOptions);
        }
        if (options) {
            Object.assign(config, options);
        }
        setupSerialization(constructor);
        let properties;
        if (constructor.hasOwnProperty("__json__properties")) {
            properties = Object.getOwnPropertyDescriptor(constructor, "__json__properties").value;
        }
        else {
            properties = {};
            Object.defineProperty(constructor, "__json__properties", { value: properties, enumerable: false, configurable: false });
        }
        properties[propertyName] = config;
    };
}
exports.Property = Property;
function Ignore(target, propertyName, propertyDescriptor) {
    let constructor = target;
    setupSerialization(constructor);
    let properties;
    if (constructor.hasOwnProperty("__json__ignoreProperties")) {
        properties = Object.getOwnPropertyDescriptor(constructor, "__json__ignoreProperties").value;
    }
    else {
        properties = [];
        Object.defineProperty(constructor, "__json__ignoreProperties", { value: properties, enumerable: false, configurable: false });
    }
    properties.push(propertyName);
}
exports.Ignore = Ignore;
/**
 * Marks a class, that is to be serialized by json serialization engine.
 */
function Serialize(target) {
    setupSerialization(target);
}
exports.Serialize = Serialize;
//# sourceMappingURL=decorators.js.map