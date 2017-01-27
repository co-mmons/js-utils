export function enumValues <T> (enumClass: any) : T[] {

    var values: T[] = [];

    for (var key in enumClass) {
        values.push(enumClass[key]);
    }

    values.length = values.length / 2;

    return values;
}

export * from "./bit-flags";
export * from "./types";
export * from "./classes";
export * from "./exception";
export * from "./type";
export * from "./forward-ref";