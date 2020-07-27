import { Type } from "../../core";
import { JsonTypeName } from "../JsonTypeName";
import { RegisterGlobalProviderOptions } from "../registerGlobalProvider";
export declare function globalType(options?: RegisterGlobalProviderOptions): (classType: Type & JsonTypeName) => void;
