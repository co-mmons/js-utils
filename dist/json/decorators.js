"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var serialization_1 = require("./serialization");
function toJsonImpl(object, prototype) {
    var json = {};
    var prototypeOfPrototype = prototype ? Object.getPrototypeOf(prototype) : null;
    var properties = prototype["__json__properties"];
    var ignoredProperties = prototype["__json__ignoredProperties"];
    if (prototype && prototypeOfPrototype && prototypeOfPrototype["toJSON"]) {
        var prototypeJson = prototypeOfPrototype.toJSON.call(object);
        if (typeof prototypeJson === "object") {
            json = prototypeJson;
        }
    }
    for (var propertyName in properties) {
        if (!ignoredProperties || ignoredProperties.indexOf(propertyName) < 0) {
            var propertyConfig = properties[propertyName];
            var propertyDescriptor = Object.getOwnPropertyDescriptor(object, propertyName);
            //let propertyValue = propertyDescriptor && propertyDescriptor.get ? object[propertyName] : (propertyDescriptor ? propertyDescriptor.value : null);
            var propertyValue = object[propertyName];
            var jsonName = propertyConfig.propertyJsonName ? propertyConfig.propertyJsonName : propertyName;
            var serializer = propertyConfig.propertyType instanceof serialization_1.Serializer ? propertyConfig.propertyType : serialization_1.serializerForType(propertyConfig.propertyType);
            json[jsonName] = serializer.serialize(propertyValue, propertyConfig);
        }
    }
    return json;
}
function fromJsonImpl(instance, prototype, json) {
    var prototypeOfPrototype = prototype ? Object.getPrototypeOf(prototype) : undefined;
    if (prototype && prototypeOfPrototype && prototypeOfPrototype["fromJSON"]) {
        prototypeOfPrototype.fromJSON.apply(instance, [json]);
    }
    var properties = prototype["__json__properties"];
    var ignoredProperties = prototype["__json__ignoredProperties"];
    for (var propertyName in properties) {
        if (!ignoredProperties || ignoredProperties.indexOf(propertyName) < 0) {
            var propertyConfig = properties[propertyName];
            var jsonName = propertyConfig.propertyJsonName ? propertyConfig.propertyJsonName : propertyName;
            var serializer = propertyConfig.propertyType instanceof serialization_1.Serializer ? propertyConfig.propertyType : serialization_1.serializerForType(propertyConfig.propertyType);
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
function Subtype(property, value, typeRef) {
    return function (target) {
        setupSerialization(target);
        var types;
        if (target.hasOwnProperty("__json__subtypes")) {
            types = Object.getOwnPropertyDescriptor(target, "__json__subtypes").value;
        }
        else {
            types = [];
            Object.defineProperty(target, "__json__subtypes", { value: types, enumerable: false, configurable: false });
        }
        types.push({ property: property, value: value, typeRef: typeRef });
    };
}
exports.Subtype = Subtype;
function Property(type, nameOrOptions, options) {
    return function (target, propertyName, propertyDescriptor) {
        var constructor = target;
        var config = { propertyType: type };
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
        var properties;
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
    var constructor = target;
    setupSerialization(constructor);
    var properties;
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