import { registerGlobalProvider } from "../registerGlobalProvider";
export function globalType(options) {
    return function (classType) {
        registerGlobalProvider(classType, options);
    };
}
//# sourceMappingURL=globalType.js.map