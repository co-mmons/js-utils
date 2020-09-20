import { getPrototypesTree } from "./getPrototypesTree";
export function getSupertypes(type) {
    return getPrototypesTree(type.prototype).map(type => type.constructor);
}
//# sourceMappingURL=getSupertypes.js.map