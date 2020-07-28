"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findTypeSerializer = void 0;
var globalProviders_1 = require("./globalProviders");
function findTypeSerializer(type, typeProviders) {
    if (!type) {
        return;
    }
    if (typeProviders) {
        for (var _i = 0, _a = typeProviders; _i < _a.length; _i++) {
            var provider = _a[_i];
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
    for (var _b = 0, globalProviders_2 = globalProviders_1.globalProviders; _b < globalProviders_2.length; _b++) {
        var provider = globalProviders_2[_b];
        if (provider.type === type && provider.serializer) {
            return provider.serializer;
        }
    }
}
exports.findTypeSerializer = findTypeSerializer;
//# sourceMappingURL=findTypeSerializer.js.map