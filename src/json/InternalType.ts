import {Type} from "../core";
import {PropertyConfig} from "./decorators/PropertyConfig";
import {SerializationOptions} from "./SerializationOptions";
import {SubtypeInfo} from "./SubtypeInfo";

export interface InternalType<T = any> extends Type<T> {
    __jsonTypeName?: string;
    __jsonSerialization?: boolean;
    __jsonToJson?: boolean;
    __jsonFromJson?: boolean;
    __jsonProperties?: {[propertyName: string]: PropertyConfig};
    __jsonIgnoredProperties?: string[];
    __jsonSubtypes?: SubtypeInfo[];
    fromJSON?: (json: any, options?: SerializationOptions) => T;
}
