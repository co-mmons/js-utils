"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ignore = void 0;
const setupSerialization_1 = require("../setupSerialization");
function ignore() {
    return function (classPrototype, propertyName, propertyDescriptor) {
        const internalType = classPrototype.constructor;
        setupSerialization_1.setupSerialization(internalType);
        const properties = internalType.__jsonIgnoredProperties = internalType.__jsonIgnoredProperties || [];
        properties.push(propertyName);
    };
}
exports.ignore = ignore;
//# sourceMappingURL=ignore.js.map