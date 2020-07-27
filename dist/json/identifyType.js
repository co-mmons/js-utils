"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.identifyType = void 0;
function identifyType(object) {
    if (object === undefined || object === null) {
        return Object;
    }
    else if (object instanceof Boolean || typeof object === "boolean") {
        return Boolean;
    }
    else if (object instanceof String || typeof object === "string") {
        return String;
    }
    else if (object instanceof Number || typeof object === "number") {
        return Number;
    }
    else if (object instanceof Date) {
        return Date;
    }
    else if (Array.isArray(object)) {
        return Array;
    }
    else if (typeof object === "function" && object.prototype) {
        return object;
    }
    else if (object && object.constructor) {
        return object.constructor;
    }
    else {
        return Object;
    }
}
exports.identifyType = identifyType;
