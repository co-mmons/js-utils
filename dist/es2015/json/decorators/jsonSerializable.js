"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonSerializable = void 0;
const getSupertypes_1 = require("../getSupertypes");
const registerType_1 = require("../registerType");
const setupSerialization_1 = require("../setupSerialization");
function jsonSerializable(options) {
    return function (classType) {
        setupSerialization_1.setupSerialization(classType);
        const type = classType;
        if (options === null || options === void 0 ? void 0 : options.properties) {
            const properties = type.__jsonProperties = Object.assign(type.__jsonProperties || {}, options.properties);
        }
        if (options === null || options === void 0 ? void 0 : options.types) {
            for (const typ of options.types) {
                registerType_1.registerType(typ);
            }
        }
        if (type.jsonTypeName) {
            for (const supertype of getSupertypes_1.getSupertypes(type)) {
                if (supertype.__jsonSerialization) {
                    const types = supertype.__jsonSubtypes = supertype.__jsonSubtypes || [];
                    types.push({
                        type: classType,
                        property: "@type",
                        value: type.jsonTypeName
                    });
                    break;
                }
            }
        }
    };
}
exports.jsonSerializable = jsonSerializable;
//# sourceMappingURL=jsonSerializable.js.map