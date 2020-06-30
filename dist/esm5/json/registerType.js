import { types } from "./types";
export function registerType(typeName, typeClass, options) {
    if (types[typeName] && types[typeName] !== typeClass && (!options || !options.replace)) {
        throw new Error("Type " + typeName + " already registered wither other class");
    }
    types[typeName] = typeClass;
}
//# sourceMappingURL=registerType.js.map