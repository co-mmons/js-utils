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
export function forwardRef(forwardRefFn) {
    forwardRefFn.__forward_ref__ = forwardRef;
    forwardRefFn.toString = function () { return JSON.stringify(this()); };
    return forwardRefFn;
}
/**
 * Lazily retrieves the reference value from a forwardRef.
 *
 * Acts as the identity function when given a non-forward-ref value.
 *
 * ### Example ([live demo](http://plnkr.co/edit/GU72mJrk1fiodChcmiDR?p=preview))
 */
export function resolveForwardRef(type) {
    if (typeof type === 'function' && type.hasOwnProperty('__forward_ref__') &&
        typeof type.__forward_ref__ === "function") {
        return type();
    }
    else {
        return type;
    }
}
//# sourceMappingURL=forward-ref.js.map