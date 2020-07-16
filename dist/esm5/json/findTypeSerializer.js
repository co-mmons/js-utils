import { globalProviders } from "./globalProviders";
export function findTypeSerializer(type, typeProviders) {
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
    for (var _b = 0, globalProviders_1 = globalProviders; _b < globalProviders_1.length; _b++) {
        var provider = globalProviders_1[_b];
        if (provider.type === type && provider.serializer) {
            return provider.serializer;
        }
    }
}
//# sourceMappingURL=findTypeSerializer.js.map