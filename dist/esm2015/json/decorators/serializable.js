import { getSupertypes } from "../getSupertypes";
import { setupSerialization } from "../setupSerialization";
export function serializable(options) {
    return function (classType) {
        setupSerialization(classType);
        const classInternalType = classType;
        if (options === null || options === void 0 ? void 0 : options.properties) {
            classInternalType.__jsonProperties = Object.assign((classInternalType.hasOwnProperty("__jsonProperties") && classInternalType.__jsonProperties) || {}, options.properties);
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
            for (const supertype of getSupertypes(classInternalType)) {
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
//# sourceMappingURL=serializable.js.map