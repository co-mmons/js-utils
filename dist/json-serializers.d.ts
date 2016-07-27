export declare class JsonSerializer {
    serialize(object: any): any;
}
/**
 * Serializes enum as a String. By default enums are serialized as numbers.
 */
export declare class EnumAsStringSerializer {
    constructor(enumClass: any);
    private enumClass;
    serialize(enumValue: any): any;
}
