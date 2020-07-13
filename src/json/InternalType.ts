import {Type} from "../core";
import {SerializationOptions} from "./SerializationOptions";

export interface InternalType<T = any> extends Type<T> {
    __jsonTypeName?: string;
    __jsonSerialization?: boolean;
    __jsonToJson?: boolean;
    __jsonFromJson?: boolean;
    __jsonProperties?: {[propertyName: string]: any};
    __jsonIgnoredProperties?: string[];
    fromJSON?: (json: any, options?: SerializationOptions) => T;
}
