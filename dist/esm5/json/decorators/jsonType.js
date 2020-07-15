import { registerType } from "../registerType";
import { setupSerialization } from "../setupSerialization";
export function jsonType(name, options) {
    return function (classType) {
        registerType(name, classType, options);
        setupSerialization(classType);
        classType.__jsonTypeName = name;
    };
}
//# sourceMappingURL=jsonType.js.map