import { getPrototypes } from "./getPrototypes";
export function getSupertypes(type) {
    return getPrototypes(type.prototype).map(function (type) { return type.constructor; });
}
//# sourceMappingURL=getSupertypes.js.map