export function toInteger(value: string | number): number {
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

export function toString(value: any): string {
    if (typeof value === "string") {
        return value;
    } else if (value === undefined || value === null) {
        return value;
    } else {
        return value.toString();
    }
}