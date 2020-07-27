import { Observable } from "rxjs";
import { PreferencesCollectionRef } from "../interfaces";
declare module "../interfaces" {
    interface PreferencesCollectionRef<Key, Value> {
        observeItems(): Observable<PreferencesItem<Key, Value>[]>;
        observeValues(): Observable<Value[]>;
    }
}
declare module "../collection-impl" {
    interface PreferencesCollectionRefImpl<Key, Value> extends PreferencesCollectionRef<Key, Value> {
    }
}
export declare function injectCollectionRxjs(): void;
