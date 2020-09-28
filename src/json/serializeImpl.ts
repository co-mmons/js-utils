import {findTypeSerializer} from "./findTypeSerializer";
import {identifyType} from "./identifyType";
import {InternalType} from "./InternalType";
import {SerializationOptions} from "./SerializationOptions";
import {Serializer} from "./Serializer";

export function serializeImpl(value: any, type: InternalType, options: SerializationOptions) {
    return serializeImplWithSerializer(value, type, options);
}

function serializeImplWithSerializer(value: any, typeOrSerializer: InternalType | Serializer, options: SerializationOptions) {

    if (value === null || value === undefined) {
        return value;
    } else {

        const array = Array.isArray(value) ? [] : undefined;
        const serializer = typeOrSerializer instanceof Serializer ? typeOrSerializer : findTypeSerializer(typeOrSerializer ? typeOrSerializer : (!array ? identifyType(value) : undefined), options?.typeProviders);

        for (const i of array ? value : [value]) {

            if (array && (i === undefined || i === null)) {
                array.push(i);
                continue;
            }

            let serialized = i;

            if (Array.isArray(i)) {
                serialized = serializeImplWithSerializer(i, serializer, options);
            } else if (serializer) {
                serialized = serializer.serialize(i, options);
            } else if (i.toJSON) {
                serialized = i.toJSON();
            }

            if (array) {
                array.push(serialized);
            } else {
                return serialized;
            }
        }

        if (array) {
            return array;
        }
    }

}