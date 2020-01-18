import { setupSerialization } from "./decorators";
export function registerSubtype(clazz, matcherOrProperty, value, type) {
    setupSerialization(clazz.prototype);
    let types;
    if (clazz.prototype.hasOwnProperty("__json__subtypes")) {
        types = Object.getOwnPropertyDescriptor(clazz.prototype, "__json__subtypes").value;
    }
    else {
        types = [];
        Object.defineProperty(clazz.prototype, "__json__subtypes", { value: types, enumerable: false, configurable: false });
    }
    types.push({
        property: typeof matcherOrProperty === "string" ? matcherOrProperty : undefined,
        value: value,
        type: type,
        matcher: typeof matcherOrProperty === "function" ? matcherOrProperty : undefined
    });
}
//# sourceMappingURL=register-subtype.js.map