import { Type } from "../../core";
import { JsonTypeName } from "../JsonTypeName";
import { PropertyConfig } from "./PropertyConfig";
export declare function jsonSerializable(options?: JsonSerializableOptions): (classType: Type) => void;
export interface JsonSerializableOptions {
    types?: Array<Type & JsonTypeName>;
    properties?: {
        [propertyName: string]: PropertyConfig;
    };
}
