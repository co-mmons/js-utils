"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonSerialize = void 0;
const setupSerialization_1 = require("../setupSerialization");
function jsonSerialize() {
    return function (classType) {
        setupSerialization_1.setupSerialization(classType);
    };
}
exports.jsonSerialize = jsonSerialize;
//# sourceMappingURL=jsonSerialize.js.map