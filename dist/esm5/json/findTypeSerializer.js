import { globalProviders } from "./globalProviders";
export function findTypeSerializer(type, typeProviders) {
    if (!type) {
        return;
    }
    if (typeProviders) {
        for (var _i = 0, typeProviders_1 = typeProviders; _i < typeProviders_1.length; _i++) {
            var provider = typeProviders_1[_i];
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
    for (var _a = 0, globalProviders_1 = globalProviders; _a < globalProviders_1.length; _a++) {
        var provider = globalProviders_1[_a];
        if (provider.type === type && provider.serializer) {
            return provider.serializer;
        }
    }
}
//# sourceMappingURL=findTypeSerializer.js.map