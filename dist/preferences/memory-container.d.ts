import { PreferencesCollectionRef, PreferencesContainer, PreferencesFilter, PreferencesItem } from "./interfaces";
export declare class MemoryPreferencesContainer implements PreferencesContainer {
    private readonly _items;
    set(collection: string, key: any, value: any): Promise<any>;
    get(collection: string, key: any): Promise<any>;
    delete(collection: string, keysOrFilter: any[] | PreferencesFilter): Promise<PreferencesItem<any, any>[]>;
    exists(collection: string, key: any): Promise<boolean>;
    items(collection: string, keysOrFilter: any[] | PreferencesFilter): Promise<PreferencesItem<any, any>[]>;
    update<Key = any, Value = any>(collection: string, key: Key, changes: Partial<Value>): Promise<PreferencesItem<Key, Value>>;
    collection<Key, Value>(name: string): PreferencesCollectionRef<Key, Value>;
}
