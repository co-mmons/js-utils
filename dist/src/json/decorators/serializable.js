"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializable = void 0;
const getSupertypes_1 = require("../getSupertypes");
const setupSerialization_1 = require("../setupSerialization");
function serializable(options) {
    // when TsTransformer used, there can be up to 2 arguments
    // second argument is default options map, so we have to marge it
    if (arguments.length === 2) {
        options = Object.assign({}, options);
        for (let i = arguments.length - 1; i >= 0; i--) {
            options.properties = Object.assign(arguments[1].properties, options.properties);
        }
    }
    return function (classType) {
        setupSerialization_1.setupSerialization(classType);
        const classInternalType = classType;
        if (options === null || options === void 0 ? void 0 : options.properties) {
            classInternalType.__jsonProperties = Object.assign((classInternalType.hasOwnProperty("__jsonProperties") && classInternalType.__jsonProperties) || {}, typeof options.properties === "string" ? { "*": null } : options.properties);
        }
        if (options === null || options === void 0 ? void 0 : options.types) {
            classInternalType.__jsonTypes = (classInternalType.hasOwnProperty("__jsonTypes") && classInternalType.__jsonTypes) || [];
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
        if (classInternalType.hasOwnProperty("jsonTypeName") && classInternalType.jsonTypeName) {
            for (const supertype of getSupertypes_1.getSupertypes(classInternalType)) {
                if (supertype.hasOwnProperty("__jsonSerialization") && supertype.__jsonSerialization) {
                    const types = supertype.__jsonSubtypes = (supertype.hasOwnProperty("__jsonSubtypes") && supertype.__jsonSubtypes) || [];
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