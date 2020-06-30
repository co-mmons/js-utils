"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
function findTypeByName(name) {
    if (typeof name === "object") {
        if (typeof name["@type"] !== "string") {
            return undefined;
        }
        name = name["@type"];
    }
    if (name) {
        return types_1.types[name];
    }
}
exports.findTypeByName = findTypeByName;
//# sourceMappingURL=findTypeByName.js.map