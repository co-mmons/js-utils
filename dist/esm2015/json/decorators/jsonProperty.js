import { Serializer } from "../Serializer";
import { setupSerialization } from "../setupSerialization";
import "reflect-metadata";
export function jsonProperty() {
    let jsonType;
    let jsonName;
    let options;
    for (let i = 0; i < arguments.length; i++) {
        if (arguments[i] instanceof Serializer || typeof arguments[i] === "function") {
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
        setupSerialization(type);
        const properties = type.__jsonProperties = type.__jsonProperties || [];
        properties[propertyName] = config;
    };
}
//# sourceMappingURL=jsonProperty.js.map