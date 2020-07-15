import { registerType } from "../registerType";
export function jsonRegisteredType(options) {
    return function (classType) {
        registerType(classType, classType.jsonTypeName, options);
    };
}
//# sourceMappingURL=jsonRegisteredType.js.map