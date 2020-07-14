import {Type} from "../core";
import {types} from "./types";

export function registerType(typeName: string, typeClass: Type, options?: {replace?: boolean}) {

    if (types[typeName] && types[typeName] !== typeClass && (!options || !options.replace)) {
        throw new Error(`Type ${typeName} already registered wither other class`);
    }

    types[typeName] = typeClass;
}
