import {Type} from "../core";
import {Serializer} from "./Serializer";

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

export interface TypeProviderLike {
    type?: Type;
    name?: string;
    serializer?: Serializer;
}

export type TypeProvider = TypeSerializerProvider | TypeNameProvider | TypeNameSerializerProvider;

export type TypeProviders = Array<TypeProviderLike | TypeProviderLike[] | TypeProviders>;

