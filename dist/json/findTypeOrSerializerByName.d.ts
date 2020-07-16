import { Type } from "../core";
import { Serializer } from "./Serializer";
import { TypeProviders } from "./TypeProvider";
export declare function findTypeOrSerializerByName(name: string | {
    "@type": string;
}, typeProviders?: TypeProviders): Type | Serializer;
