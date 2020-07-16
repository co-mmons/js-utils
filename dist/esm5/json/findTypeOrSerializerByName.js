import { globalProviders } from "./globalProviders";
export function findTypeOrSerializerByName(name, typeProviders) {
    if (typeof name === "object") {
        if (typeof (name === null || name === void 0 ? void 0 : name["@type"]) !== "string") {
            return undefined;
        }
        name = name["@type"];
    }
    if (name) {
        if (typeProviders) {
            for (var _i = 0, typeProviders_1 = typeProviders; _i < typeProviders_1.length; _i++) {
                var provider = typeProviders_1[_i];
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
        for (var _a = 0, globalProviders_1 = globalProviders; _a < globalProviders_1.length; _a++) {
            var provider = globalProviders_1[_a];
            if (provider.name === name) {
                return provider.serializer || provider.type;
            }
        }
    }
}
//# sourceMappingURL=findTypeOrSerializerByName.js.map