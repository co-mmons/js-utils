import { Type } from "../core";
import { SubtypeMatcher } from "./SubtypeMatcher";
export interface SubtypeInfo {
    type: Type;
    matcher?: SubtypeMatcher;
    property?: string;
    value?: ((value: any) => boolean) | any;
}
