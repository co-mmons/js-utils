import { Type } from "../core";
import { SerializationOptions } from "./SerializationOptions";
import { Serializer } from "./Serializer";
export interface PropertyConfig extends SerializationOptions {
    propertyType?: Type<any> | Serializer;
    propertyJsonName?: string;
}
