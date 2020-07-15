import { registerType } from "../registerType";
export function registeredType(options) {
    return function (classType) {
        registerType(classType, options);
    };
}
//# sourceMappingURL=registeredType.js.map