import {deepEqual} from "fast-equals";
import {PreferencesCollectionRefImpl} from "./collection-impl";
import {deepClone} from "./deep-clone";
import {PreferencesCollectionRef, PreferencesContainer, PreferencesFilter, PreferencesItem} from "./interfaces";

export class MemoryPreferencesContainer implements PreferencesContainer {

    private readonly _items: PreferencesItem[] = [];

    protected changed(collection: string, key: any, operation: "new" | "update" | "delete") {
    }

    set(collection: string, key: any, value: any) {

        let item = this._items.find(item => item.collection === collection && deepEqual(item.key, key));

        if (item) {
            item.value = value;
            this.changed(collection, key, "update");
            return Promise.resolve(deepClone(item));

        } else {
            item = {collection: collection, key: key, value: value};
            this._items.push(item);
            this.changed(collection, key, "new");
            return Promise.resolve(deepClone(item));
        }
    }

    get(collection: string, key: any) {
        const item = this._items.find(item => item.collection === collection && deepEqual(item.key, key));
        return Promise.resolve((item && deepClone(item)) || null);
    }

    delete(collection: string, keysOrFilter: any[] | PreferencesFilter) {

        const deleted: PreferencesItem[] = [];

        if (Array.isArray(keysOrFilter)) {

            KEYS: for (const key of keysOrFilter) {

                for (let i = 0; i < this._items.length; i++) {

                    if (this._items[i].collection === collection && deepEqual(this._items[i].key, key)) {

                        for (const item of this._items.splice(i, 1)) {
                            this.changed(collection, item.key, "delete");
                            deleted.push(deepClone(item));
                        }

                        continue KEYS;
                    }
                }
            }

        } else {
            for (let i = 0; i < this._items.length; i++) {
                if (this._items[i].collection === collection && (!keysOrFilter || keysOrFilter(this._items[i].key, this._items[i].value))) {
                    for (const item of this._items.splice(i, 1)) {
                        this.changed(collection, item.key, "delete");
                        deleted.push(deepClone(item));
                    }
                }
            }
        }

        return Promise.resolve(deleted);
    }

    exists(collection: string, key: any): Promise<boolean> {
        return Promise.resolve(!!this._items.find(item => item.collection === collection && deepEqual(item.key, key)));
    }

    items(collection: string, keysOrFilter: any[] | PreferencesFilter) {

        const items: PreferencesItem[] = [];

        if (Array.isArray(keysOrFilter)) {

            KEYS: for (const key of keysOrFilter) {

                for (const item of this._items) {

                    if (item.collection === collection && deepEqual(item.key, key)) {
                        items.push(deepClone(item));
                        continue KEYS;
                    }
                }
            }

        } else {
            for (const item of this._items) {
                if (item.collection === collection && (!keysOrFilter || keysOrFilter(item.key, item.value))) {
                    items.push(deepClone(item));
                }
            }
        }

        return Promise.resolve(items);
    }

    update<Key = any, Value = any>(collection: string, key: Key, changes: Partial<Value>): Promise<PreferencesItem<Key, Value>> {

        const item = this._items.find(item => item.collection === collection && deepEqual(item.key, key));
        if (item) {

            if (changes) {
                item.value = Object.assign({}, item.value, changes);
                this.changed(collection, item.key, "update");
            }

            return Promise.resolve(deepClone(item));

        } else {
            return Promise.reject(new Error("Key not exists"));
        }
    }

    collection<Key, Value>(name: string): PreferencesCollectionRef<Key, Value> {
        return new PreferencesCollectionRefImpl(this, name);
    }
}
