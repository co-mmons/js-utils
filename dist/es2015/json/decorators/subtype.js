"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subtype = void 0;
const setupSerialization_1 = require("../setupSerialization");
function subtype(supertype, propertyOrMatcher, value) {
    return function (classType) {
        setupSerialization_1.setupSerialization(supertype);
        const internalType = supertype;
        const types = internalType.__jsonSubtypes = internalType.__jsonSubtypes || [];
        types.push({
            type: classType,
            property: typeof propertyOrMatcher === "string" ? propertyOrMatcher : undefined,
            value: value,
            matcher: typeof propertyOrMatcher === "function" ? propertyOrMatcher : undefined
        });
    };
}
exports.subtype = subtype;
//# sourceMappingURL=subtype.js.map