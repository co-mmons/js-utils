import {Type} from "../core";
import {findTypeSerializer} from "./findTypeSerializer";
import {InternalType} from "./InternalType";
import {SerializationOptions} from "./SerializationOptions";
import {ObjectSerializer} from "./serializers";
import {unserializeImpl} from "./unserializeImpl";

export function unserialize(json: any, targetClass?: Type, options?: SerializationOptions) {

    if (json === undefined || json === null) {
        return json;
    }

    if (targetClass) {

        const internalType = targetClass as InternalType;
        const serializer = findTypeSerializer(targetClass);

        const array: any[] = Array.isArray(json) ? [] : undefined;

        for (const i of array ? json : [json]) {

            const unserialized = unserializeImpl(i, serializer || internalType, options);

            if (array) {
                array.push(unserialized);
            } else {
                return unserialized;
            }
        }

        if (array) {
            return array;
        }
    }

    return ObjectSerializer.instance.unserialize(json, options);
}
