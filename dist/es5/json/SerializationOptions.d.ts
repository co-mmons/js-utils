import { TypeProvider } from "./TypeProvider";
export interface SerializationOptions {
    notStrict?: boolean;
    disallowUndefinedOrNull?: boolean;
    ignoreErrors?: boolean;
    typeProviders?: TypeProvider[];
    [propName: string]: any;
}
