"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fast_equals_1 = require("fast-equals");
const collection_impl_1 = require("./collection-impl");
const deep_clone_1 = require("./deep-clone");
class MemoryPreferencesContainer {
    constructor() {
        this._items = [];
    }
    changed(collection, key, operation) {
    }
    set(collection, key, value) {
        let item = this._items.find(item => item.collection === collection && fast_equals_1.deepEqual(item.key, key));
        if (item) {
            item.value = value;
            this.changed(collection, key, "update");
            return Promise.resolve(deep_clone_1.deepClone(item));
        }
        else {
            item = { collection: collection, key: key, value: value };
            this._items.push(item);
            this.changed(collection, key, "new");
            return Promise.resolve(deep_clone_1.deepClone(item));
        }
    }
    get(collection, key) {
        const item = this._items.find(item => item.collection === collection && fast_equals_1.deepEqual(item.key, key));
        return Promise.resolve((item && deep_clone_1.deepClone(item)) || null);
    }
    delete(collection, keysOrFilter) {
        const deleted = [];
        if (Array.isArray(keysOrFilter)) {
            KEYS: for (const key of keysOrFilter) {
                for (let i = 0; i < this._items.length; i++) {
                    if (this._items[i].collection === collection && fast_equals_1.deepEqual(this._items[i].key, key)) {
                        for (const item of this._items.splice(i, 1)) {
                            this.changed(collection, item.key, "delete");
                            deleted.push(deep_clone_1.deepClone(item));
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
                        this.changed(collection, item.key, "delete");
                        deleted.push(deep_clone_1.deepClone(item));
                    }
                }
            }
        }
        return Promise.resolve(deleted);
    }
    exists(collection, key) {
        return Promise.resolve(!!this._items.find(item => item.collection === collection && fast_equals_1.deepEqual(item.key, key)));
    }
    items(collection, keysOrFilter) {
        const items = [];
        if (Array.isArray(keysOrFilter)) {
            KEYS: for (const key of keysOrFilter) {
                for (const item of this._items) {
                    if (item.collection === collection && fast_equals_1.deepEqual(item.key, key)) {
                        items.push(deep_clone_1.deepClone(item));
                        continue KEYS;
                    }
                }
            }
        }
        else {
            for (const item of this._items) {
                if (item.collection === collection && (!keysOrFilter || keysOrFilter(item.key, item.value))) {
                    items.push(deep_clone_1.deepClone(item));
                }
            }
        }
        return Promise.resolve(items);
    }
    update(collection, key, changes) {
        const item = this._items.find(item => item.collection === collection && fast_equals_1.deepEqual(item.key, key));
        if (item) {
            if (changes) {
                item.value = Object.assign({}, item.value, changes);
                this.changed(collection, item.key, "update");
            }
            return Promise.resolve(deep_clone_1.deepClone(item));
        }
        else {
            return Promise.reject(new Error("Key not exists"));
        }
    }
    collection(name) {
        return new collection_impl_1.PreferencesCollectionRefImpl(this, name);
    }
}
exports.MemoryPreferencesContainer = MemoryPreferencesContainer;
//# sourceMappingURL=memory-container.js.map