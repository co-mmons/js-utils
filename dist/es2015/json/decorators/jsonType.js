"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonType = void 0;
const registerType_1 = require("../registerType");
const setupSerialization_1 = require("../setupSerialization");
function jsonType(name, options) {
    return function (classType) {
        registerType_1.registerType(classType, name, options);
        setupSerialization_1.setupSerialization(classType);
        classType.__jsonTypeName = name;
    };
}
exports.jsonType = jsonType;
//# sourceMappingURL=jsonType.js.map