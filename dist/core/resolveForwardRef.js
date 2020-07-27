"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveForwardRef = void 0;
/**
 * Lazily retrieves the reference value from a forwardRef.
 *
 * Acts as the identity function when given a non-forward-ref value.
 *
 * ### Example ([live demo](http://plnkr.co/edit/GU72mJrk1fiodChcmiDR?p=preview))
 */
function resolveForwardRef(type) {
    if (typeof type === "function" && type.hasOwnProperty("__forward_ref__") && typeof type.__forward_ref__ === "function") {
        return type();
    }
    else {
        return type;
    }
}
exports.resolveForwardRef = resolveForwardRef;
