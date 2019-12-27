export function deepClone<T>(obj: T) {
    return obj === undefined ? undefined : JSON.parse(JSON.stringify(obj));
}
