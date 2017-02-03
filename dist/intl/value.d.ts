import { Type } from "../core";
import { Serializer, ObjectAsMapSerializer } from "../json";
export interface IntlValue<V> {
    [locale: string]: V;
}
export declare namespace IntlValue {
    function value<V>(value: IntlValue<V>, locale?: string): V;
    function clone<V>(value: IntlValue<V>): IntlValue<V>;
}
export declare class IntlValueSerializer extends ObjectAsMapSerializer {
    constructor(valueType: Type<any> | Serializer);
}
