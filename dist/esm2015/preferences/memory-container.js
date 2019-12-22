import { deepEqual } from "fast-equals";
import { PreferencesCollectionRefImpl } from "./collection-impl";
import { deepClone } from "./deep-clone";
export class MemoryPreferencesContainer {
    constructor() {
        this._items = [];
    }
    set(collection, key, value) {
        let item = this._items.find(item => item.collection === collection && deepEqual(item.key, key));
        if (item) {
            item.value = value;
            return Promise.resolve(deepClone(item));
        }
        else {
            item = { collection: collection, key: key, value: value };
            this._items.push(item);
            return Promise.resolve(deepClone(item));
        }
    }
    get(collection, key) {
        const item = this._items.find(item => item.collection === collection && deepEqual(item.key, key));
        return Promise.resolve((item && deepClone(item)) || null);
    }
    delete(collection, keysOrFilter) {
        const deleted = [];
        if (Array.isArray(keysOrFilter)) {
            KEYS: for (const key of keysOrFilter) {
                for (let i = 0; i < this._items.length; i++) {
                    if (this._items[i].collection === collection && deepEqual(this._items[i].key, key)) {
                        for (const item of this._items.splice(i, 1)) {
                            deleted.push(deepClone(item));
                        }
                        continue KEYS;
                    }
                }
            }
        }
        else {
            for (let i = 0; i < this._items.length; i++) {
                if (this._items[i].collection === collection && (!keysOrFilter || keysOrFilter(this._items[i].key, this._items[i].value))) {
                    for (const item of this._items.splice(i, 1)) {
                        deleted.push(deepClone(item));
                    }
                }
            }
        }
        return Promise.resolve(deleted);
    }
    exists(collection, key) {
        return Promise.resolve(!!this._items.find(item => item.collection === collection && deepEqual(item.key, key)));
    }
    items(collection, keysOrFilter) {
        const items = [];
        if (Array.isArray(keysOrFilter)) {
            KEYS: for (const key of keysOrFilter) {
                for (const item of this._items) {
                    if (item.collection === collection && deepEqual(item.key, key)) {
                        items.push(deepClone(item));
                        continue KEYS;
                    }
                }
            }
        }
        else {
            for (const item of this._items) {
                if (item.collection === collection && (!keysOrFilter || keysOrFilter(item.key, item.value))) {
                    items.push(deepClone(item));
                }
            }
        }
        return Promise.resolve(items);
    }
    update(collection, key, changes) {
        const item = this._items.find(item => item.collection === collection && deepEqual(item.key, key));
        if (item) {
            if (changes) {
                item.value = Object.assign({}, item.value, changes);
            }
            return Promise.resolve(deepClone(item));
        }
        else {
            return Promise.reject(new Error("Key not exists"));
        }
    }
    collection(name) {
        return new PreferencesCollectionRefImpl(this, name);
    }
}
//# sourceMappingURL=memory-container.js.map