import { setupSerialization } from "../setupSerialization";
export function jsonSerializable() {
    return function (classType) {
        setupSerialization(classType);
    };
}
//# sourceMappingURL=jsonSerializable.js.map