import { __values } from "tslib";
import { globalProviders } from "./globalProviders";
export function findTypeOrSerializerByName(name, typeProviders) {
    var e_1, _a, e_2, _b;
    if (typeof name === "object") {
        if (typeof (name === null || name === void 0 ? void 0 : name["@type"]) !== "string") {
            return undefined;
        }
        name = name["@type"];
    }
    if (name) {
        if (typeProviders) {
            try {
                for (var typeProviders_1 = __values(typeProviders), typeProviders_1_1 = typeProviders_1.next(); !typeProviders_1_1.done; typeProviders_1_1 = typeProviders_1.next()) {
                    var provider = typeProviders_1_1.value;
                    if (Array.isArray(provider)) {
                        var result = findTypeOrSerializerByName(name, provider);
                        if (result) {
                            return result;
                        }
                    }
                    else if (provider.name === name) {
                        return provider.serializer || provider.type;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (typeProviders_1_1 && !typeProviders_1_1.done && (_a = typeProviders_1.return)) _a.call(typeProviders_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        try {
            for (var globalProviders_1 = __values(globalProviders), globalProviders_1_1 = globalProviders_1.next(); !globalProviders_1_1.done; globalProviders_1_1 = globalProviders_1.next()) {
                var provider = globalProviders_1_1.value;
                if (provider.name === name) {
                    return provider.serializer || provider.type;
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (globalProviders_1_1 && !globalProviders_1_1.done && (_b = globalProviders_1.return)) _b.call(globalProviders_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
    }
}
//# sourceMappingURL=findTypeOrSerializerByName.js.map