import {findTypeOrSerializerByName} from "./findTypeOrSerializerByName";
import {findTypeSerializer} from "./findTypeSerializer";
import {identifyType} from "./identifyType";
import {InternalType} from "./InternalType";
import {SerializationOptions} from "./SerializationOptions";
import {Serializer} from "./Serializer";

export function unserializeImpl(value: any, typeOrSerializer: InternalType | Serializer, options: SerializationOptions) {

    if (value === undefined || value === null) {
        return value;
    }

    const serializer = typeOrSerializer instanceof Serializer ? typeOrSerializer : findTypeSerializer(typeOrSerializer, options?.typeProviders);

    if (Array.isArray(value)) {
        const array = [];

        for (const i of value) {
            array.push(unserializeImpl(i, serializer, options));
        }

        return array;
    }

    if (serializer) {
        return serializer.unserialize(value, options);

    } else if ((typeOrSerializer as InternalType)?.fromJSON) {
        return (typeOrSerializer as InternalType).fromJSON(value, options);

    } else if ((typeOrSerializer as InternalType)?.prototype["fromJSON"]) {
        const unserialized = Object.create((typeOrSerializer as InternalType).prototype);
        unserialized.fromJSON(value, options);
        return unserialized;

    } else if (typeOrSerializer && typeOrSerializer !== Object) {
        return new (typeOrSerializer as any)(value);

    } else {

        const type = identifyType(value);
        if (type !== Object) {
            const serializer = findTypeSerializer(type, options?.typeProviders);
            if (serializer) {
                return serializer.unserialize(value, options)
            }
        }

        const namedTypeOrSerializer = findTypeOrSerializerByName(value, options?.typeProviders);
        if (namedTypeOrSerializer) {
            return unserializeImpl(value, namedTypeOrSerializer, options);
        }

        const niu = {};

        for (const property of Object.keys(value)) {
            niu[property] = unserializeImpl(value[property], null, options);
        }

        return niu;

    }
}