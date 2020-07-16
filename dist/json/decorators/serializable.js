"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializable = void 0;
const getSupertypes_1 = require("../getSupertypes");
const setupSerialization_1 = require("../setupSerialization");
function serializable(options) {
    return function (classType) {
        setupSerialization_1.setupSerialization(classType);
        const classInternalType = classType;
        if (options === null || options === void 0 ? void 0 : options.properties) {
            classInternalType.__jsonProperties = Object.assign(classInternalType.__jsonProperties || {}, options.properties);
        }
        if (options === null || options === void 0 ? void 0 : options.types) {
            classInternalType.__jsonTypes = classInternalType.__jsonTypes || [];
            for (const types of options.types) {
                for (const type of Array.isArray(types) ? types : [types]) {
                    if (type.jsonTypeName) {
                        classInternalType.__jsonTypes.push({ name: type.jsonTypeName, type: type });
                    }
                    else {
                        classInternalType.__jsonTypes.push(type);
                    }
                }
            }
        }
        if (classInternalType.jsonTypeName) {
            for (const supertype of getSupertypes_1.getSupertypes(classInternalType)) {
                if (supertype.__jsonSerialization) {
                    const types = supertype.__jsonSubtypes = supertype.__jsonSubtypes || [];
                    types.push({
                        type: classType,
                        property: "@type",
                        value: classInternalType.jsonTypeName
                    });
                    break;
                }
            }
        }
    };
}
exports.serializable = serializable;
//# sourceMappingURL=serializable.js.map