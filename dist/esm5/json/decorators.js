import { Serializer, serializerForType } from "./serialization";
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
            var serializer = propertyConfig.propertyType instanceof Serializer ? propertyConfig.propertyType : serializerForType(propertyConfig.propertyType);
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
            var serializer = propertyConfig.propertyType instanceof Serializer ? propertyConfig.propertyType : serializerForType(propertyConfig.propertyType);
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
export function Subtype(propertyOrMatcher, value, typeRef) {
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
        types.push({
            property: typeof propertyOrMatcher === "string" ? propertyOrMatcher : undefined,
            value: value,
            type: typeRef,
            matcher: typeof propertyOrMatcher === "function" ? propertyOrMatcher : undefined
        });
    };
}
export function Subtypes(matcherOrTypes) {
    return function (target) {
        setupSerialization(target);
        var allTypes;
        if (target.hasOwnProperty("__json__subtypes")) {
            allTypes = Object.getOwnPropertyDescriptor(target, "__json__subtypes").value;
        }
        else {
            allTypes = [];
            Object.defineProperty(target, "__json__subtypes", { value: allTypes, enumerable: false, configurable: false });
        }
        if (Array.isArray(matcherOrTypes)) {
            for (var _i = 0, matcherOrTypes_1 = matcherOrTypes; _i < matcherOrTypes_1.length; _i++) {
                var type = matcherOrTypes_1[_i];
                allTypes.push(type);
            }
        }
        else if (typeof matcherOrTypes === "function") {
            allTypes.push({ matcher: matcherOrTypes });
        }
    };
}
export function Property(type, nameOrOptions, options) {
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
export function Ignore(target, propertyName, propertyDescriptor) {
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
/**
 * Marks a class, that is to be serialized by json serialization engine.
 */
export function Serialize(target) {
    setupSerialization(target);
}
//# sourceMappingURL=decorators.js.map