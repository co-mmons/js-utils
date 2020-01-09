import { PreferencesCollectionRef, PreferencesItem, PreferencesItemRef } from "./interfaces";
export declare class PreferenceItemImpl<Key, Value> implements PreferencesItem<Key, Value> {
    constructor(collection: PreferencesCollectionRef, key: Key, value: Value);
    get key(): any;
    readonly ref: PreferencesItemRef;
    readonly value: Value;
}
