import { Type } from "../core";
import { SerializationOptions } from "./SerializationOptions";
export declare function unserialize<T>(json: any, targetClass?: Type, options?: SerializationOptions): T;
