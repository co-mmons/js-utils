"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerGlobalProviders = exports.registerGlobalProvider = void 0;
const globalProviders_1 = require("./globalProviders");
function registerGlobalProvider(provider, options) {
    const internal = provider;
    const existing = globalProviders_1.globalProviders.findIndex(glob => (internal.name && glob.name === internal.name) || (internal.type && glob.type === internal.type));
    if (existing > -1 && !(options === null || options === void 0 ? void 0 : options.replace)) {
        throw new Error("Global provider already exists: " + JSON.stringify(internal));
    }
    if (existing > -1) {
        globalProviders_1.globalProviders[existing] = internal;
    }
    else {
        globalProviders_1.globalProviders.push(internal);
    }
}
exports.registerGlobalProvider = registerGlobalProvider;
function registerGlobalProviders(providers, options) {
    for (const provider of providers) {
        if (Array.isArray(provider)) {
            registerGlobalProviders(provider);
        }
        else {
            registerGlobalProvider(provider, options);
        }
    }
}
exports.registerGlobalProviders = registerGlobalProviders;
//# sourceMappingURL=registerGlobalProvider.js.map