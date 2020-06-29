import {Type} from "./type";

export interface EnumStatic<T> {
    fromJSON(value: EnumFromJSONValue): T;
    values(): T[];
    valueOf(name: EnumValueOfValue): T;
}

export interface EnumValueJson<TypeOfEnumClass = any> {
    name: TypeOfEnumClass extends EnumStatic<any> ? EnumValueName<TypeOfEnumClass> : string;
}

export type EnumFromJSONValue = string | EnumValueJson | any;
export type EnumValueOfValue = string | EnumValueJson;
export type EnumValueName<TypeOfEnumClass extends EnumStatic<any>> = Extract<Exclude<keyof TypeOfEnumClass, "prototype" | "values" | "fromJSON" | "valueOf">, string>;

export abstract class Enum {

    protected static values(): Enum[] {
        return valuesRef(this).slice();
    }

    protected static fromJSON(value: EnumFromJSONValue): Enum {

        let name: string;

        if (typeof value === "string") {
            name = value;
        } else if (typeof value === "object" && typeof value.name === "string") {
            name = value.name;
        }

        if (name) {
            for (const v of valuesRef(this)) {
                if (v.name === name) {
                    return v;
                }
            }
        }

        throw new Error("Invalid value " + value + " for enum " + this.name);
    }

    protected static valueOf(name: EnumValueOfValue): Enum {

        if (typeof name === "object") {
            name = name.name;
        }

        for (const v of valuesRef(this)) {
            if (v.name === name) {
                return v;
            }
        }

        throw new Error("Invalid value " + name + " for enum " + this.name);
    }

    protected constructor(public readonly name: string) {
        addValue(this.constructor, this as any);
    }

    equals(name: string | Enum | EnumValueJson): boolean {

        if (typeof name === "string") {
            return name === this.name;
        } else if (name.name === this.name) {
            return true;
        }

        return false;
    }

    toJSON() {
        return {name: this.name};
    }

}

function addValue<EnumClass extends Enum>(enumClass: Type<EnumClass>, value: EnumClass) {
    valuesRef(enumClass).push(value);
}

function valuesRef<EnumClass extends Enum>(enumClass: Type<EnumClass>): EnumClass[] {
    if (!enumClass["__enumValues"]) {
        enumClass["__enumValues"] = [];
    }

    return enumClass["__enumValues"];
}
