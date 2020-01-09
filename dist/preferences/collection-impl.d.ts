import { PreferencesCollectionRef, PreferencesContainer, PreferencesItem, PreferencesItemEventListener, PreferencesSetOptions } from "./interfaces";
export declare class PreferencesCollectionRefImpl<Key, Value> implements PreferencesCollectionRef<Key, Value> {
    readonly container: PreferencesContainer;
    readonly name: string;
    constructor(container: PreferencesContainer, name: string);
    itemRef(key: Key): any;
    items(): any;
    delete(): Promise<PreferencesItem[]>;
    exists(key: Key): Promise<boolean>;
    item(key: Key): PreferencesItem<Key, Value>;
    set(key: Key, value: Value | Partial<Value>, options?: PreferencesSetOptions): Promise<PreferencesItem<Key, Value>>;
    update(key: Key, value: Partial<Value>): Promise<PreferencesItem<Key, Value>>;
    value(key: Key): Promise<any>;
    values(): Promise<Value[]>;
    listen(listener: PreferencesItemEventListener): () => void;
}
