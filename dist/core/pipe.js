"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pipe = void 0;
function pipe(arg, firstFn, ...fns) {
    return fns.reduce((acc, fn) => fn(acc), firstFn(arg));
}
exports.pipe = pipe;
//# sourceMappingURL=pipe.js.map