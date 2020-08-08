import {SerializationOptions} from "./SerializationOptions";
import {ObjectSerializer} from "./serializers";

export function serialize(object: any, options?: SerializationOptions): any {
    return ObjectSerializer.instance.serialize(object, options);
}