"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.property = void 0;
const Serializer_1 = require("../Serializer");
const setupSerialization_1 = require("../setupSerialization");
require("reflect-metadata");
function property() {
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
        else if (arguments[i] && typeof arguments[i] === "object") {
            options = arguments[i];
        }
    }
    return function (classPrototype, propertyName, propertyDescriptor) {
        const type = classPrototype.constructor;
        const config = Object.assign({
            propertyType: jsonType,
            propertyDesignType: !jsonType && Reflect.getMetadata("design:type", classPrototype, propertyName),
            propertyJsonName: jsonName
        }, options);
        (0, setupSerialization_1.setupSerialization)(type);
        const properties = type.__jsonProperties = (type.hasOwnProperty("__jsonProperties") && type.__jsonProperties) || {};
        properties[propertyName] = config;
    };
}
exports.property = property;
//# sourceMappingURL=property.js.map