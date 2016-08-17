export declare class BitFlags {
    constructor(value?: number);
    protected _value: number;
    value: number;
    has(flag: number): boolean;
    not(flag: number): boolean;
    add(flag: number): BitFlags;
    remove(flag: number): BitFlags;
    toggle(flag: number): BitFlags;
}
export declare class BitFlagsMutable extends BitFlags {
    constructor(value?: number);
    add(flag: number): BitFlagsMutable;
    remove(flag: number): BitFlagsMutable;
    toggle(flag: number): BitFlagsMutable;
}
