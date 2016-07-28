"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
function setupJsonSerialization(constructor) {
    if (!constructor.hasOwnProperty("toJSON")) {
        constructor.toJSON = function () {
            return toJsonImpl(this, constructor);
        };
    }
}
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
            var jsonName = propertyConfig.name ? propertyConfig.name : propertyName;
            json[jsonName] = propertyConfig.serializer ? propertyConfig.serializer.serialize(propertyValue) : propertyValue;
        }
    }
    return json;
}
var JsonSerializer = (function () {
    function JsonSerializer() {
    }
    JsonSerializer.prototype.serialize = function (object) {
        return object;
    };
    return JsonSerializer;
}());
exports.JsonSerializer = JsonSerializer;
function JsonProperty(jsonConfig) {
    return function (target, propertyName, propertyDescriptor) {
        var constructor = target;
        var config = (typeof jsonConfig === "string") ? { name: jsonConfig } : (jsonConfig ? jsonConfig : {});
        setupJsonSerialization(constructor);
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
exports.JsonProperty = JsonProperty;
function JsonIgnore(target, propertyName, propertyDescriptor) {
    var constructor = target;
    setupJsonSerialization(constructor);
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
exports.JsonIgnore = JsonIgnore;
__export(require("./json-serializers"));
