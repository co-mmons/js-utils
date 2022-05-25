import { AssignableType } from "../core";
import { SerializationOptions } from "./SerializationOptions";
export declare function toJsonImpl(this: any, options?: SerializationOptions): any;
export declare function fromJsonImpl(this: AssignableType, json: any, options?: SerializationOptions): any;
