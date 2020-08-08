"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Enumerable = void 0;
function Enumerable(isEnumerable) {
    return function (target, propertyKey, descriptor) {
        descriptor.enumerable = isEnumerable;
        return descriptor;
    };
}
exports.Enumerable = Enumerable;
//# sourceMappingURL=Enumerable.js.map