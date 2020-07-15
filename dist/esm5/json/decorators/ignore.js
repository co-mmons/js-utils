import { setupSerialization } from "../setupSerialization";
export function ignore() {
    return function (classPrototype, propertyName, propertyDescriptor) {
        var internalType = classPrototype.constructor;
        setupSerialization(internalType);
        var properties = internalType.__jsonIgnoredProperties = internalType.__jsonIgnoredProperties || [];
        properties.push(propertyName);
    };
}
//# sourceMappingURL=ignore.js.map