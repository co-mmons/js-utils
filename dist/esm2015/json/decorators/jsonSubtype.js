import { setupSerialization } from "../setupSerialization";
export function jsonSubtype(supertype, propertyOrMatcher, value) {
    return function (classType) {
        setupSerialization(supertype);
        const internalType = supertype;
        const types = internalType.__jsonSubtypes = internalType.__jsonSubtypes || [];
        types.push({
            type: classType,
            property: typeof propertyOrMatcher === "string" ? propertyOrMatcher : undefined,
            value: value,
            matcher: typeof propertyOrMatcher === "function" ? propertyOrMatcher : undefined
        });
    };
}
//# sourceMappingURL=jsonSubtype.js.map