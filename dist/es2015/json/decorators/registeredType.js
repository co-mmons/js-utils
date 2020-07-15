"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registeredType = void 0;
const registerType_1 = require("../registerType");
function registeredType(options) {
    return function (classType) {
        registerType_1.registerType(classType, options);
    };
}
exports.registeredType = registeredType;
//# sourceMappingURL=registeredType.js.map