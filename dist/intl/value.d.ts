import { Serializer } from "./../json/serializer";
import { ObjectAsMapSerializer } from "../json/object-serializer";
export interface IntlValue<V> {
    [locale: string]: V;
}
export declare namespace IntlValue {
    function value<V>(value: IntlValue<V>, locale?: string): V;
    function clone<V>(value: IntlValue<V>): IntlValue<V>;
}
export declare class IntlValueSerializer extends ObjectAsMapSerializer {
    constructor(valueType: Function | Serializer);
}
