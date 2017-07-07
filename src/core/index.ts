export function enumValues <T> (enumClass: any) : T[] {

    let values: T[] = [];

    for (let key in enumClass) {
        if (typeof enumClass[key] === "number" && enumClass[enumClass[key]]) {
            values.push(enumClass[key]);
        }
    }

    return values;
}

export * from "./bit-flags";
export * from "./types";
export * from "./classes";
export * from "./exception";
export * from "./type";
export * from "./forward-ref";
export * from "./compare";

import BigNumber from "bignumber.js";
export type BigNumber = BigNumber;