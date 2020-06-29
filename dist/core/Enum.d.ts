export interface EnumStatic<T> {
    fromJSON(value: EnumFromJSONValue): T;
    values(): T[];
    valueOf(name: EnumValueOfValue): T;
}
export interface EnumValueJson<TypeOfEnumClass = any> {
    name: TypeOfEnumClass extends EnumStatic<any> ? EnumValueName<TypeOfEnumClass> : string;
}
export declare type EnumFromJSONValue = string | EnumValueJson | any;
export declare type EnumValueOfValue = string | EnumValueJson;
export declare type EnumValueName<TypeOfEnumClass extends EnumStatic<any>> = Extract<Exclude<keyof TypeOfEnumClass, "prototype" | "values" | "fromJSON" | "valueOf">, string>;
export declare abstract class Enum {
    readonly name: string;
    protected static values(): Enum[];
    protected static fromJSON(value: EnumFromJSONValue): Enum;
    protected static valueOf(name: EnumValueOfValue): Enum;
    protected constructor(name: string);
    equals(name: string | Enum | EnumValueJson): boolean;
    toJSON(): {
        name: string;
    };
}
