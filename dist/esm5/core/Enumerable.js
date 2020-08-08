export function Enumerable(isEnumerable) {
    return function (target, propertyKey, descriptor) {
        descriptor.enumerable = isEnumerable;
        return descriptor;
    };
}
//# sourceMappingURL=Enumerable.js.map