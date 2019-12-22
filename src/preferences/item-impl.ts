import {PreferencesCollectionRef, PreferencesItemRef} from "./interfaces";

export class PreferenceItemRefImpl<Key, Value> implements PreferencesItemRef<Key, Value> {

    constructor(public readonly collection: PreferencesCollectionRef<Key, Value>, public readonly key: Key) {
    }

    async delete(): Promise<boolean> {
        return (await this.collection.delete(this.key)).length === 1;
    }

    async get(): Promise<Value> {
        return await this.collection.value(this.key);
    }

    set(value: Value) {
        return this.collection.set(this.key, value);
    }

    update(value: Value) {
        return this.collection.update(this.key, value);
    }

}
