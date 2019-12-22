import { PreferencesCollectionRef, PreferencesContainer, PreferencesFilter, PreferencesItem, PreferencesSetOptions } from "./interfaces";
export declare class StoragePreferencesContainer implements PreferencesContainer {
    private readonly storage;
    constructor(storage: typeof window.localStorage | typeof window.sessionStorage);
    private getStorageItem;
    private setStorageItem;
    private isCollectionStorageKey;
    private storageKey;
    private realKey;
    set(collection: string, key: any, value: any, options?: PreferencesSetOptions): Promise<PreferencesItem<any, any>>;
    get(collection: string, key: any): Promise<PreferencesItem<any, any>>;
    delete(collection: string, keysOrFilter: any[] | PreferencesFilter): Promise<PreferencesItem<any, any>[]>;
    exists(collection: string, key: any): Promise<boolean>;
    items(collection: string, keysOrFilter: any[] | PreferencesFilter): Promise<PreferencesItem<any, any>[]>;
    update<Key = any, Value = any>(collection: string, key: Key, changes: Partial<Value>): Promise<PreferencesItem<Key, Value>>;
    collection<Key, Value>(name: string): PreferencesCollectionRef<Key, Value>;
}
