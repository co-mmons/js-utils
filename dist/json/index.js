var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { Serializer } from "./serializer";
import { StringSerializer } from "./string-serializer";
import { NumberSerializer } from "./number-serializer";
import { BooleanSerializer } from "./boolean-serializer";
import { ArrayOfAny } from "./array-serializer";
function setupSerialization(constructor) {
    constructor["__json__serialization"] = true;
    if (!constructor.hasOwnProperty("toJSON")) {
        constructor.toJSON = function () {
            return toJsonImpl(this, constructor);
        };
    }
    if (!constructor.hasOwnProperty("fromJSON")) {
        constructor.fromJSON = function (json) {
            return fromJsonImpl(this, constructor, json);
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
function serializerForType(type) {
    if (type === Boolean)
        return BooleanSerializer.INSTANCE;
    if (type === Number)
        return NumberSerializer.INSTANCE;
    if (type === String)
        return StringSerializer.INSTANCE;
    if (type === Array)
        return ArrayOfAny;
    return OBJECT_SERIALIZER;
}
var ObjectSerializer = (function (_super) {
    __extends(ObjectSerializer, _super);
    function ObjectSerializer() {
        _super.apply(this, arguments);
    }
    ObjectSerializer.prototype.serialize = function (object, options) {
        if (object === null || object === undefined)
            return object;
        if (object.toJSON) {
            return object.toJSON();
        }
        return object;
    };
    ObjectSerializer.prototype.unserialize = function (json, options) {
        if (this.isUndefinedOrNull(json))
            return json;
        else if (options && typeof options["propertyType"] === "function") {
            return unserialize(json, options["propertyType"]);
        }
        return json;
    };
    return ObjectSerializer;
}(Serializer));
var OBJECT_SERIALIZER = new ObjectSerializer();
export function serialize(object) {
    if (!object)
        return null;
    if (object.toJSON) {
        return object.toJSON();
    }
    else {
        return object;
    }
}
export function unserialize(json, targetClass) {
    var serializer = serializerForType(targetClass);
    if (serializer && serializer !== OBJECT_SERIALIZER)
        return serializer.unserialize(json);
    var prototype = targetClass.prototype;
    if (prototype.hasOwnProperty("fromJSON")) {
        var instance = Object.create(prototype);
        instance.fromJSON(json);
        return instance;
    }
    else if (targetClass !== Object) {
        var instance = Object.create(prototype);
        targetClass.apply(instance, [json]);
        return instance;
    }
    return json;
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
//# sourceMappingURL=index.js.map