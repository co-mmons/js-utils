"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.property = void 0;
var Serializer_1 = require("../Serializer");
var setupSerialization_1 = require("../setupSerialization");
require("reflect-metadata");
function property() {
    var jsonType;
    var jsonName;
    var options;
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] instanceof Serializer_1.Serializer || typeof arguments[i] === "function") {
            jsonType = arguments[i];
        }
        else if (typeof arguments[i] === "string") {
            jsonName = arguments[i];
        }
        else if (arguments[i] && typeof arguments[i] === "object") {
            options = arguments[i];
        }
    }
    return function (classPrototype, propertyName, propertyDescriptor) {
        if (!jsonType) {
            jsonType = Reflect.getMetadata("design:type", classPrototype, propertyName);
        }
        var type = classPrototype.constructor;
        var config = Object.assign({ propertyType: jsonType, propertyJsonName: jsonName }, options);
        setupSerialization_1.setupSerialization(type);
        var properties = type.__jsonProperties = (type.hasOwnProperty("__jsonProperties") && type.__jsonProperties) || {};
        properties[propertyName] = config;
    };
}
exports.property = property;
