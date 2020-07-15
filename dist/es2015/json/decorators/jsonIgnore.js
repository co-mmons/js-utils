"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonIgnore = void 0;
const setupSerialization_1 = require("../setupSerialization");
function jsonIgnore() {
    return function (classPrototype, propertyName, propertyDescriptor) {
        const internalType = classPrototype.constructor;
        setupSerialization_1.setupSerialization(internalType);
        const properties = internalType.__jsonIgnoredProperties = internalType.__jsonIgnoredProperties || [];
        properties.push(propertyName);
    };
}
exports.jsonIgnore = jsonIgnore;
//# sourceMappingURL=jsonIgnore.js.map