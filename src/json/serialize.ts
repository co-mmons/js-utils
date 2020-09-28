import {SerializationOptions} from "./SerializationOptions";
import {serializeImpl} from "./serializeImpl";

export function serialize(object: any, options?: SerializationOptions): any {
    return serializeImpl(object, null, options);
}