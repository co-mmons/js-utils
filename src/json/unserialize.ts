import {Type} from "../core";
import {findTypeSerializer} from "./findTypeSerializer";
import {InternalType} from "./InternalType";
import {SerializationOptions} from "./SerializationOptions";
import {unserializeImpl} from "./unserializeImpl";

export function unserialize(json: any, targetClass?: Type, options?: SerializationOptions) {

    if (json === undefined || json === null) {
        return json;
    }
    const internalType = targetClass as InternalType;
    const serializer = targetClass && findTypeSerializer(targetClass);

    return unserializeImpl(json, serializer || internalType || null, options);
}
