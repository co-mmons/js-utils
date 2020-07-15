import { Type } from "../core";
import { PropertyConfig } from "./decorators/PropertyConfig";
import { SerializationOptions } from "./SerializationOptions";
import { SubtypeInfo } from "./SubtypeInfo";
export interface InternalType<T = any> extends Type<T> {
    __jsonSerialization?: boolean;
    __jsonToJson?: boolean;
    __jsonFromJson?: boolean;
    __jsonProperties?: {
        [propertyName: string]: PropertyConfig;
    };
    __jsonIgnoredProperties?: string[];
    __jsonSubtypes?: SubtypeInfo[];
    jsonTypeName?: string;
    fromJSON?: (json: any, options?: SerializationOptions) => T;
}
