import { getSupertypes } from "../getSupertypes";
import { registerType } from "../registerType";
import { setupSerialization } from "../setupSerialization";
export function serializable(options) {
    return function (classType) {
        setupSerialization(classType);
        const type = classType;
        if (options === null || options === void 0 ? void 0 : options.properties) {
            const properties = type.__jsonProperties = Object.assign(type.__jsonProperties || {}, options.properties);
        }
        if (options === null || options === void 0 ? void 0 : options.types) {
            for (const typ of options.types) {
                registerType(typ);
            }
        }
        if (type.jsonTypeName) {
            for (const supertype of getSupertypes(type)) {
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
//# sourceMappingURL=serializable.js.map