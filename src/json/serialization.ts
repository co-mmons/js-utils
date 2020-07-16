import {Type} from "../core";
import {findTypeSerializer} from "./findTypeSerializer";
import {InternalType} from "./InternalType";
import {SerializationOptions} from "./SerializationOptions";
import {ObjectSerializer} from "./serializers";

export function serialize(object: any, options?: SerializationOptions): any {
    return ObjectSerializer.instance.serialize(object, options);
}

export function unserialize<T>(json: any, targetClass?: Type, options?: SerializationOptions): T {

    if (json === undefined || json === null) {
        return json;
    }

    if (targetClass) {

        const internalType = targetClass as InternalType;

        const serializer = findTypeSerializer(targetClass);
        if (serializer) {
            return serializer.unserialize(json, options);
        }

        if (targetClass.prototype["fromJSON"]) {
            const instance = Object.create(targetClass.prototype);
            instance.fromJSON(json, options);
            return instance;
        } else if (internalType.fromJSON) {
            return internalType.fromJSON(json, options);
        } else if (targetClass !== Object) {
            return new (targetClass as any)(json);
        }
    }

    return ObjectSerializer.instance.unserialize(json, options);
}
