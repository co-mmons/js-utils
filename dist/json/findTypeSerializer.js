"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findTypeSerializer = void 0;
const globalProviders_1 = require("./globalProviders");
function findTypeSerializer(type, typeProviders) {
    if (!type || type === Object || type === Array) {
        return;
    }
    if (typeProviders) {
        for (const provider of typeProviders) {
            if (Array.isArray(provider)) {
                const result = findTypeSerializer(type, provider);
                if (result) {
                    return result;
                }
            }
            else if (provider.type === type && provider.serializer) {
                return provider.serializer;
            }
        }
    }
    for (const provider of globalProviders_1.globalProviders) {
        if (provider.type === type && provider.serializer) {
            return provider.serializer;
        }
    }
}
exports.findTypeSerializer = findTypeSerializer;
//# sourceMappingURL=findTypeSerializer.js.map