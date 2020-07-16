import {AssignableType} from "../core";
import {types} from "./types";

export function findTypeByName(name: string | {"@type": string}) {

    if (typeof name === "object") {
        if (typeof name?.["@type"] !== "string") {
            return undefined;
        }

        name = name["@type"];
    }

    if (name) {
        return types[name] as AssignableType;
    }
}
