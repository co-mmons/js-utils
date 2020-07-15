import { Type } from "../../core";
export declare function jsonType(name: string, options?: {
    replace?: boolean;
}): (classType: Type) => void;
