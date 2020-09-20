"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSerialization = void 0;
const toFromJsonImpl_1 = require("./toFromJsonImpl");
function setupSerialization(type) {
    const internalType = type;
    internalType.__jsonSerialization = true;
    if (!type.prototype.hasOwnProperty("toJSON")) {
        internalType.__jsonToJson = true;
        type.prototype.toJSON = function () {
            return toFromJsonImpl_1.toJsonImpl.call(this);
        };
    }
    if (!type.hasOwnProperty("fromJSON")) {
        internalType.__jsonFromJson = true;
        internalType.fromJSON = function (json) {
            return toFromJsonImpl_1.fromJsonImpl.call(this, json);
        };
    }
}
exports.setupSerialization = setupSerialization;
//# sourceMappingURL=setupSerialization.js.map