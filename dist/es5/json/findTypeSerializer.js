"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findTypeSerializer = void 0;
var tslib_1 = require("tslib");
var globalProviders_1 = require("./globalProviders");
function findTypeSerializer(type, typeProviders) {
    var e_1, _a, e_2, _b;
    if (!type) {
        return;
    }
    if (typeProviders) {
        try {
            for (var _c = tslib_1.__values(typeProviders), _d = _c.next(); !_d.done; _d = _c.next()) {
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
        for (var globalProviders_2 = tslib_1.__values(globalProviders_1.globalProviders), globalProviders_2_1 = globalProviders_2.next(); !globalProviders_2_1.done; globalProviders_2_1 = globalProviders_2.next()) {
            var provider = globalProviders_2_1.value;
            if (provider.type === type && provider.serializer) {
                return provider.serializer;
            }
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (globalProviders_2_1 && !globalProviders_2_1.done && (_b = globalProviders_2.return)) _b.call(globalProviders_2);
        }
        finally { if (e_2) throw e_2.error; }
    }
}
exports.findTypeSerializer = findTypeSerializer;
//# sourceMappingURL=findTypeSerializer.js.map