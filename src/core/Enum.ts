import {Type} from "./type";

export interface EnumStatic<T> {
    fromJSON(value: EnumFromJSONValue): T;
    values(): T[];
    valueOf(name: EnumValueOfValue): T;
}

export interface EnumValueJson<TypeOfEnumClass = any> {
    "@type": string;
    name: TypeOfEnumClass extends EnumStatic<any> ? EnumValueName<TypeOfEnumClass> : string;
}

export type EnumFromJSONValue = string | EnumValueJson | any;
export type EnumValueOfValue = string | EnumValueJson;
export type EnumValueName<TypeOfEnumClass extends EnumStatic<any>> = Extract<Exclude<keyof TypeOfEnumClass, "prototype" | "values" | "fromJSON" | "valueOf" | "jsonTypeName">, string>;

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

        throw new Error("Invalid value " + JSON.stringify(value) + " for enum " + this.jsonTypeName);
    }

    protected static get jsonTypeName() {
        return this.name;
    }

    protected static valueOf(name: EnumValueOfValue): Enum {

        CHECK_NAME: if (name) {

            if (typeof name === "object") {
                if (name["@type"] === this.jsonTypeName) {
                    name = name.name;
                } else {
                    break CHECK_NAME;
                }
            }

            for (const v of valuesRef(this)) {
                if (v.name === name) {
                    return v;
                }
            }
        }

        throw new Error("Invalid value " + JSON.stringify(name) + " for enum " + this.name);
    }

    protected constructor(public readonly name: string) {
        addValue(this.constructor, this as any);
    }

    equals(value: string | Enum | EnumValueJson): boolean {

        if (typeof value === "string") {
            return value === this.name;
        } else if ("@type" in value) {
            return value["@type"] === this.__jsonTypeName && value.name === this.name;
        } else if (value.constructor === this.constructor) {
            return value.name === this.name;
        }

        return false;
    }

    toJSON() {
        return {"@type": this.__jsonTypeName, name: this.name};
    }

    private get __jsonTypeName() {
        return this.constructor["jsonTypeName"] || this.constructor.name;
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
