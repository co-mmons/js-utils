import { Type } from "../../core";
import { JsonTypeName } from "../JsonTypeName";
import { TypeProvider } from "../TypeProvider";
import { PropertyConfig } from "./PropertyConfig";
export declare function serializable(options?: JsonSerializableOptions): (classType: Type) => void;
export interface JsonSerializableOptions {
    types?: Array<(Type & JsonTypeName) | TypeProvider | Array<(Type & JsonTypeName) | TypeProvider>>;
    properties?: {
        [propertyName: string]: PropertyConfig;
    };
}
