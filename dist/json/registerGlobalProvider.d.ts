import { TypeProvider, TypeProviders } from "./TypeProvider";
export declare function registerGlobalProvider(provider: TypeProvider, options?: RegisterGlobalProviderOptions): void;
export declare function registerGlobalProviders(providers: TypeProviders, options?: RegisterGlobalProviderOptions): void;
export interface RegisterGlobalProviderOptions {
    replace?: boolean;
}
