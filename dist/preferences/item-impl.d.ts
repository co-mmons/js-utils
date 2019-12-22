import { PreferencesCollectionRef, PreferencesItemRef } from "./interfaces";
export declare class PreferenceItemRefImpl<Key, Value> implements PreferencesItemRef<Key, Value> {
    readonly collection: PreferencesCollectionRef<Key, Value>;
    readonly key: Key;
    constructor(collection: PreferencesCollectionRef<Key, Value>, key: Key);
    delete(): Promise<boolean>;
    get(): Promise<Value>;
    set(value: Value): Promise<import("./interfaces").PreferencesItem<Key, Value>>;
    update(value: Value): Promise<import("./interfaces").PreferencesItem<Key, Value>>;
}
