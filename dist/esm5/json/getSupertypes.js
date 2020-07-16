import { getPrototypesTree } from "./getPrototypesTree";
export function getSupertypes(type) {
    return getPrototypesTree(type.prototype).map(function (type) { return type.constructor; });
}
//# sourceMappingURL=getSupertypes.js.map