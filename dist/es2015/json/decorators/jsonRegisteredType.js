"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonRegisteredType = void 0;
const registerType_1 = require("../registerType");
function jsonRegisteredType(options) {
    return function (classType) {
        registerType_1.registerType(classType, classType.jsonTypeName, options);
    };
}
exports.jsonRegisteredType = jsonRegisteredType;
//# sourceMappingURL=jsonRegisteredType.js.map