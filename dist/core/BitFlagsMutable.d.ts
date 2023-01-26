import { BitFlags } from "./BitFlags";
import { clone, Clone } from "./clone";
export declare class BitFlagsMutable extends BitFlags implements Clone<BitFlagsMutable> {
    constructor(value?: number);
    add(flag: number): BitFlagsMutable;
    remove(flag: number): BitFlagsMutable;
    toggle(flag: number): BitFlagsMutable;
    [clone](): BitFlagsMutable;
}
