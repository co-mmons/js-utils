"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonProperty = void 0;
const Serializer_1 = require("../Serializer");
const setupSerialization_1 = require("../setupSerialization");
require("reflect-metadata");
function jsonProperty() {
    let jsonType;
    let jsonName;
    let options;
    for (let i = 0; i < arguments.length; i++) {
        if (arguments[i] instanceof Serializer_1.Serializer || typeof arguments[i] === "function") {
            jsonType = arguments[i];
        }
        else if (typeof arguments[i] === "string") {
            jsonName = arguments[i];
        }
        else if (typeof arguments[i] === "object") {
            options = arguments[i];
        }
    }
    return function (classPrototype, propertyName, propertyDescriptor) {
        if (!jsonType) {
            jsonType = Reflect.getMetadata("design:type", classPrototype, propertyName);
        }
        const type = classPrototype.constructor;
        const config = Object.assign({ propertyType: jsonType, propertyJsonName: jsonName }, options);
        setupSerialization_1.setupSerialization(type);
        const properties = type.__jsonProperties = type.__jsonProperties || {};
        properties[propertyName] = config;
    };
}
exports.jsonProperty = jsonProperty;
//# sourceMappingURL=jsonProperty.js.map