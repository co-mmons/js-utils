import { registerGlobalProvider } from "../registerGlobalProvider";
export function globalType(options) {
    return function (classType) {
        registerGlobalProvider({ name: classType.jsonTypeName, type: classType }, options);
    };
}
//# sourceMappingURL=globalType.js.map