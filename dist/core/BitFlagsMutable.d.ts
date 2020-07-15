import { BitFlags } from "./BitFlags";
export declare class BitFlagsMutable extends BitFlags {
    constructor(value?: number);
    add(flag: number): BitFlagsMutable;
    remove(flag: number): BitFlagsMutable;
    toggle(flag: number): BitFlagsMutable;
}
