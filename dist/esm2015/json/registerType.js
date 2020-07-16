import { types } from "./types";
export function registerType() {
    const typeClass = arguments[0];
    const typeName = arguments.length > 0 && typeof arguments[1] === "string" ? arguments[1] : typeClass.jsonTypeName;
    const options = arguments.length === 2 && typeof arguments[1] === "object" && arguments[1] ? arguments[1] : (arguments.length === 3 && typeof arguments[2] === "object" && arguments[2] ? arguments[2] : undefined);
    if (types[typeName] && types[typeName] !== typeClass && (!options || !options.replace)) {
        throw new Error(`Type ${typeName} already registered wither other class`);
    }
    types[typeName] = typeClass;
}
//# sourceMappingURL=registerType.js.map