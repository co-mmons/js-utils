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
            for (const provider of typeProviders) {
                if (Array.isArray(provider)) {
                    const result = findTypeOrSerializerByName(name, provider);
                    if (result) {
                        return result;
                    }
                }
                else if (provider.jsonTypeName === name) {
                    return provider;
                }
                else if (provider.name === name) {
                    return provider.serializer || provider.type;
                }
            }
        }
        for (const provider of globalProviders) {
            if (provider.jsonTypeName === name) {
                return provider;
            }
            else if (provider.name === name) {
                return provider.serializer || provider.type;
            }
        }
    }
}
//# sourceMappingURL=findTypeOrSerializerByName.js.map