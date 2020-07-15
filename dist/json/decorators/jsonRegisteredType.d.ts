import { Type } from "../../core";
import { JsonTypeName } from "../JsonTypeName";
import { RegisterTypeOptions } from "../registerType";
export declare function jsonRegisteredType(options?: RegisterTypeOptions): (classType: Type & JsonTypeName) => void;
