export function deepClone(obj) {
    return obj === undefined ? undefined : JSON.parse(JSON.stringify(obj));
}
//# sourceMappingURL=deep-clone.js.map