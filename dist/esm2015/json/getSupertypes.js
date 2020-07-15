import { getPrototypes } from "./getPrototypes";
export function getSupertypes(type) {
    return getPrototypes(type.prototype).map(type => type.constructor);
}
//# sourceMappingURL=getSupertypes.js.map