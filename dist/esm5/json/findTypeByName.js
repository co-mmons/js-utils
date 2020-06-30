import { types } from "./types";
export function findTypeByName(name) {
    if (typeof name === "object") {
        if (typeof name["@type"] !== "string") {
            return undefined;
        }
        name = name["@type"];
    }
    if (name) {
        return types[name];
    }
}
//# sourceMappingURL=findTypeByName.js.map