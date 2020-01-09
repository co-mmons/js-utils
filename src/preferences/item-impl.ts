import {PreferencesCollectionRef, PreferencesItem, PreferencesItemRef} from "./interfaces";

export class PreferencesItemImpl<Key, Value> implements PreferencesItem<Key, Value> {

    constructor(collection: PreferencesCollectionRef, key: Key, value: Value) {
        this.ref = collection.itemRef(key);
        this.value = value;
    }

    get key() {
        return this.ref.key;
    }

    readonly ref: PreferencesItemRef;

    readonly value: Value;
}
