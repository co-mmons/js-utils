import { types } from "./types";
export function findTypeByName(name) {
    if (typeof name === "object") {
        if (typeof (name === null || name === void 0 ? void 0 : name["@type"]) !== "string") {
            return undefined;
        }
        name = name["@type"];
    }
    if (name) {
        return types[name];
    }
}
//# sourceMappingURL=findTypeByName.js.map