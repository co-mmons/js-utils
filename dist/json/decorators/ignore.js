"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ignore = void 0;
var setupSerialization_1 = require("../setupSerialization");
function ignore() {
    return function (classPrototype, propertyName, propertyDescriptor) {
        var internalType = classPrototype.constructor;
        setupSerialization_1.setupSerialization(internalType);
        var properties = internalType.__jsonIgnoredProperties = (internalType.hasOwnProperty("__jsonIgnoredProperties") && internalType.__jsonIgnoredProperties) || [];
        properties.push(propertyName);
    };
}
exports.ignore = ignore;
