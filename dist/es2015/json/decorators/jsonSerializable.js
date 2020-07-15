"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonSerializable = void 0;
const setupSerialization_1 = require("../setupSerialization");
function jsonSerializable() {
    return function (classType) {
        setupSerialization_1.setupSerialization(classType);
    };
}
exports.jsonSerializable = jsonSerializable;
//# sourceMappingURL=jsonSerializable.js.map