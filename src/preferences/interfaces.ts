export interface PreferencesContainer {

    set<Key = any, Value = any>(collection: string, key: Key, value: Value | Partial<Value>, options?: PreferencesSetOptions): Promise<PreferencesItem<Key, Value>>;

    update<Key = any, Value = any>(collection: string, key: Key, value: Partial<Value>): Promise<PreferencesItem<Key, Value>>;

    get<Key = any, Value = any>(collection: string, key: Key): Promise<PreferencesItem<Key, Value>>;

    exists(collection: string, key: any): Promise<boolean>;

    delete<Key = any, Value = any>(collection: string): Promise<PreferencesItem<Key, Value>[]>;

    delete<Key = any, Value = any>(collection: string, ...keys: Key[]): Promise<PreferencesItem<Key, Value>[]>;

    delete<Key = any, Value = any>(collection: string, filter: PreferencesFilter<Key, Value>): Promise<PreferencesItem<Key, Value>[]>;

    items<Key = any, Value = any>(collection: string, ...keys: Key[]): Promise<PreferencesItem<Key, Value>[]>;

    items<Key = any, Value = any>(collection: string, filter?: PreferencesFilter<Key, Value>): Promise<PreferencesItem<Key, Value>[]>;

    collection<Key, Value>(name: string): PreferencesCollectionRef<Key, Value>;

}

export interface PreferencesItem<Key = any, Value = any> {
    collection: string;
    key: Key;
    value: Value;
}

export interface PreferencesSetOptions {
    merge?: boolean;
}

export interface PreferencesItemRef<Key = any, Value = any> {

    readonly collection: PreferencesCollectionRef<Key, Value>;

    readonly key: Key;

    value(): Promise<Value>;

    delete(): Promise<boolean>;

    set(value: Value): Promise<PreferencesItem<Key, Value>>;

    set(value: Value | Partial<Value>, options?: PreferencesSetOptions): Promise<PreferencesItem<Key, Value>>;

    update(value: Value): Promise<PreferencesItem<Key, Value>>;
}

export interface PreferencesItemValueRef<Value = any> extends PreferencesItemRef<any, Value> {
}

export interface PreferencesFilter<Key = any, Value = any> {
    (key: Key, value: Value): boolean;
}

export interface PreferencesCollectionRef<Key = any, Value = any> {

    readonly name: string;

    readonly container: PreferencesContainer;

    item(key: Key): PreferencesItemRef<Key, Value>;

    items(...keys: Key[]): PreferencesItemRef<Key, Value>[];

    items(filter?: PreferencesFilter<Key, Value>): Promise<PreferencesItemRef<Key, Value>[]>;

    items(): Promise<PreferencesItemRef<Key, Value>[]>;

    set(key: Key, value: Value): Promise<PreferencesItem<Key, Value>>;

    set(key: Key, value: Value | Partial<Value>, options?: PreferencesSetOptions): Promise<PreferencesItem<Key, Value>>;

    update(key: Key, value: Partial<Value>): Promise<PreferencesItem<Key, Value>>;

    exists(key: Key): Promise<boolean>;

    value(key: Key): Promise<Value>;

    values(...keys: Key[]): Promise<Value[]>;

    values(filter?: PreferencesFilter<Key, Value>): Promise<Value[]>;

    // observeValue(key: Key): Observable<Value>;
    // observeValues(filter?: DataCollectionFilter<Key, Value>): Observable<Value[]>;

    delete(...keys: Key[]): Promise<PreferencesItem<Key, Value>[]>;

    delete(filter?: PreferencesFilter<Key, Value>): Promise<PreferencesItem<Key, Value>[]>;

    delete(): Promise<PreferencesItem<Key, Value>[]>;
}
