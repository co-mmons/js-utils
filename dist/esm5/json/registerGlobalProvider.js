import { __values } from "tslib";
import { globalProviders } from "./globalProviders";
export function registerGlobalProvider(provider, options) {
    var internal = provider;
    var existing = globalProviders.findIndex(function (glob) { return (internal.name && glob.name === internal.name) || (internal.type && glob.type === internal.type); });
    if (existing > -1 && !(options === null || options === void 0 ? void 0 : options.replace)) {
        throw new Error("Global provider already exists: " + JSON.stringify(internal));
    }
    if (existing > -1) {
        globalProviders[existing] = internal;
    }
    else {
        globalProviders.push(internal);
    }
}
export function registerGlobalProviders(providers, options) {
    var e_1, _a;
    try {
        for (var providers_1 = __values(providers), providers_1_1 = providers_1.next(); !providers_1_1.done; providers_1_1 = providers_1.next()) {
            var provider = providers_1_1.value;
            if (Array.isArray(provider)) {
                registerGlobalProviders(provider);
            }
            else {
                registerGlobalProvider(provider, options);
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (providers_1_1 && !providers_1_1.done && (_a = providers_1.return)) _a.call(providers_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
}
//# sourceMappingURL=registerGlobalProvider.js.map