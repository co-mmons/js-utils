import {Type} from "../core";
import {globalProviders} from "./globalProviders";
import {Serializer} from "./Serializer";
import {TypeProviders} from "./TypeProvider";

export function findTypeSerializer(type: Type, typeProviders?: TypeProviders): Serializer {

    if (!type) {
        return;
    }

    if (typeProviders) {
        for (const provider of typeProviders) {
            if (Array.isArray(provider)) {
                const result = findTypeSerializer(type, provider);
                if (result) {
                    return result;
                }
            } else if (provider.type === type && provider.serializer) {
                return provider.serializer;
            }
        }
    }

    for (const provider of globalProviders) {
        if (provider.type === type && provider.serializer) {
            return provider.serializer;
        }
    }
}
