import { Type } from "../core";
import { Serializer, ObjectAsMapSerializer } from "../json";

export interface IntlValue<V> {
    [locale: string]: V;
}

export namespace IntlValue {

    export function value<V>(value: IntlValue<V>, locale?: string): V {

        if (value) {
            return value[locale];
        }

        return undefined;
    }

    export function clone<V>(value: IntlValue<V>): IntlValue<V> {

        if (!value) {
            return value;
        }

        let niu: IntlValue<V> = {};

        for (let i in value) {
            niu[i] = value[i];
        }

        return niu;
    }
}

export class IntlValueSerializer extends ObjectAsMapSerializer {

    constructor(valueType: Type<any> | Serializer) {
        super(valueType);
    }

}
