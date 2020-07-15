import { setupSerialization } from "../setupSerialization";
export function jsonSerialize() {
    return function (classType) {
        setupSerialization(classType);
    };
}
//# sourceMappingURL=jsonSerialize.js.map