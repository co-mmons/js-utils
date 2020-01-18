import { setupSerialization } from "./decorators";
export function registerSubtype(clazz, matcherOrProperty, value, type) {
    setupSerialization(clazz);
    var types;
    if (clazz.hasOwnProperty("__json__subtypes")) {
        types = Object.getOwnPropertyDescriptor(clazz, "__json__subtypes").value;
    }
    else {
        types = [];
        Object.defineProperty(clazz, "__json__subtypes", { value: types, enumerable: false, configurable: false });
    }
    types.push({
        property: typeof matcherOrProperty === "string" ? matcherOrProperty : undefined,
        value: value,
        type: type,
        matcher: typeof matcherOrProperty === "function" ? matcherOrProperty : undefined
    });
}
//# sourceMappingURL=register-subtype.js.map