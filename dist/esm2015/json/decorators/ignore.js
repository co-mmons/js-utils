import { setupSerialization } from "../setupSerialization";
export function ignore() {
    return function (classPrototype, propertyName, propertyDescriptor) {
        const internalType = classPrototype.constructor;
        setupSerialization(internalType);
        const properties = internalType.__jsonIgnoredProperties = internalType.__jsonIgnoredProperties || [];
        properties.push(propertyName);
    };
}
//# sourceMappingURL=ignore.js.map