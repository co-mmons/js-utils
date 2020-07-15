export interface SerializationOptions {
    notStrict?: boolean;
    disallowUndefinedOrNull?: boolean;
    ignoreErrors?: boolean;
    [propName: string]: any;
}
