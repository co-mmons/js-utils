import { __values } from "tslib";
import { globalProviders } from "./globalProviders";
export function findTypeSerializer(type, typeProviders) {
    var e_1, _a, e_2, _b;
    if (!type) {
        return;
    }
    if (typeProviders) {
        try {
            for (var _c = __values(typeProviders), _d = _c.next(); !_d.done; _d = _c.next()) {
                var provider = _d.value;
                if (Array.isArray(provider)) {
                    var result = findTypeSerializer(type, provider);
                    if (result) {
                        return result;
                    }
                }
                else if (provider.type === type && provider.serializer) {
                    return provider.serializer;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    try {
        for (var globalProviders_1 = __values(globalProviders), globalProviders_1_1 = globalProviders_1.next(); !globalProviders_1_1.done; globalProviders_1_1 = globalProviders_1.next()) {
            var provider = globalProviders_1_1.value;
            if (provider.type === type && provider.serializer) {
                return provider.serializer;
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
//# sourceMappingURL=findTypeSerializer.js.map