"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findTypeByName = void 0;
const types_1 = require("./types");
function findTypeByName(name) {
    if (typeof name === "object") {
        if (typeof (name === null || name === void 0 ? void 0 : name["@type"]) !== "string") {
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