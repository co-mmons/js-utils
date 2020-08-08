"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forwardRef = void 0;
/**
 * Allows to refer to references which are not yet defined.
 *
 * For instance, `forwardRef` is used when the `token` which we need to refer to for the purposes of
 * DI is declared,
 * but not yet defined. It is also used when the `token` which we use when creating a query is not
 * yet defined.
 *
 * ### Example
 * {@example core/di/ts/forward_ref/forward_ref_spec.ts region='forward_ref'}
 * @experimental
 */
function forwardRef(forwardRefFn) {
    forwardRefFn.__forward_ref__ = forwardRef;
    forwardRefFn.toString = function () { return JSON.stringify(this()); };
    return forwardRefFn;
}
exports.forwardRef = forwardRef;
//# sourceMappingURL=forwardRef.js.map