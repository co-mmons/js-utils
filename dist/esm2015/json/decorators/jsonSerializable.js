import { registerType } from "../registerType";
import { setupSerialization } from "../setupSerialization";
export function jsonSerializable(options) {
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
    };
}
//# sourceMappingURL=jsonSerializable.js.map