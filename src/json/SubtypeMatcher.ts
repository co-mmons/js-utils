import {ForwardRefFn, Type} from "../core";

export type SubtypeMatcher = (json: any) => Type | ForwardRefFn;
