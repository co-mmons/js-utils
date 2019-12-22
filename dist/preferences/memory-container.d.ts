import { PreferencesCollectionRef, PreferencesContainer, PreferencesFilter, PreferencesItem, PreferencesSetOptions } from "./interfaces";
export declare class MemoryPreferencesContainer implements PreferencesContainer {
    protected readonly itemsArray: PreferencesItem[];
    protected changed(collection: string, key: any, operation: "new" | "update" | "delete"): void;
    set(collection: string, key: any, value: any, options?: PreferencesSetOptions): Promise<any>;
    get(collection: string, key: any): Promise<any>;
    delete(collection: string, keysOrFilter: any[] | PreferencesFilter): Promise<PreferencesItem<any, any>[]>;
    exists(collection: string, key: any): Promise<boolean>;
    items(collection: string, keysOrFilter: any[] | PreferencesFilter): Promise<PreferencesItem<any, any>[]>;
    update<Key = any, Value = any>(collection: string, key: Key, changes: Partial<Value>): Promise<PreferencesItem<Key, Value>>;
    collection<Key, Value>(name: string): PreferencesCollectionRef<Key, Value>;
}