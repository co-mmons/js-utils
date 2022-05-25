import { Type } from "../core";
import { Serializer } from "./Serializer";
export interface TypeSerializerProvider {
    type: Type;
    serializer: Serializer;
}
export interface TypeNameProvider {
    type: Type;
    name: string;
}
export interface TypeNameSerializerProvider {
    name: string;
    serializer: Serializer;
}
export interface InternalTypeProvider {
    type?: Type;
    name?: string;
    serializer?: Serializer;
}
export declare type TypeWithJsonTypeName = (Type & {
    jsonTypeName: string;
});
export declare type TypeProvider = TypeSerializerProvider | TypeNameProvider | TypeNameSerializerProvider | TypeWithJsonTypeName;
export declare type TypeProviders = Array<TypeProvider | TypeProvider[] | TypeProviders>;
export declare type InternalTypeProviders = Array<InternalTypeProvider | InternalTypeProvider[] | TypeProviders>;
