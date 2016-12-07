export function asInteger(value: string | number): number {
    if (typeof value === "number") {
        return value as number;
    } else if (typeof value === "string") {
        return parseInt(value);
    } else if (value) {
        throw `Cannot convert value "${value}" to integer`;
    } else {
        return value;
    }
}
