import { Type } from "../core";
import { Serializer } from "./Serializer";
import { TypeProviders } from "./TypeProvider";
export declare function findTypeSerializer(type: Type, typeProviders?: TypeProviders): Serializer;
