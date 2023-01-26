export const clone = Symbol("@co.mmons/js-utils/core/clone");

export interface Clone<T> {
    [clone](): T;
}
