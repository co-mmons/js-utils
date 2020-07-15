import { Type } from "../../core";
import { JsonTypeName } from "../JsonTypeName";
import { RegisterTypeOptions } from "../registerType";
export declare function registeredType(options?: RegisterTypeOptions): (classType: Type & JsonTypeName) => void;
