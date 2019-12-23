"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fast_equals_1 = require("fast-equals");
const collection_impl_1 = require("./collection-impl");
const deep_clone_1 = require("./deep-clone");
class MemoryPreferencesContainer {
    constructor() {
        this.itemsArray = [];
    }
    changed(collection, key, operation) {
    }
    set(collection, key, value, options) {
        let item = this.itemsArray.find(item => item.collection === collection && fast_equals_1.deepEqual(item.key, key));
        if (item) {
            item.value = options && options.merge ? Object.assign({}, item.value, value) : deep_clone_1.deepClone(value);
            this.changed(collection, key, "update");
            return Promise.resolve(deep_clone_1.deepClone(item));
        }
        else {
            item = { collection: collection, key: deep_clone_1.deepClone(key), value: deep_clone_1.deepClone(value) };
            this.itemsArray.push(item);
            this.changed(collection, key, "new");
            return Promise.resolve(deep_clone_1.deepClone(item));
        }
    }
    get(collection, key) {
        const item = this.itemsArray.find(item => item.collection === collection && fast_equals_1.deepEqual(item.key, key));
        return Promise.resolve((item && deep_clone_1.deepClone(item)) || null);
    }
    delete(collection, ...keysOrFilter) {
        const deleted = [];
        if (Array.isArray(keysOrFilter)) {
            KEYS: for (const key of keysOrFilter) {
                for (let i = 0; i < this.itemsArray.length; i++) {
                    if (this.itemsArray[i].collection === collection && fast_equals_1.deepEqual(this.itemsArray[i].key, key)) {
                        for (const item of this.itemsArray.splice(i, 1)) {
                            this.changed(collection, item.key, "delete");
                            deleted.push(deep_clone_1.deepClone(item));
                        }
                        continue KEYS;
                    }
                }
            }
        }
        else {
            const filter = arguments.length > 1 && typeof arguments[1] === "function" && arguments[1];
            for (let i = 0; i < this.itemsArray.length; i++) {
                if (this.itemsArray[i].collection === collection && (arguments.length === 0 || (filter && filter(this.itemsArray[i].key, this.itemsArray[i].value)))) {
                    for (const item of this.itemsArray.splice(i, 1)) {
                        this.changed(collection, item.key, "delete");
                        deleted.push(deep_clone_1.deepClone(item));
                    }
                }
            }
        }
        return Promise.resolve(deleted);
    }
    exists(collection, key) {
        return Promise.resolve(!!this.itemsArray.find(item => item.collection === collection && fast_equals_1.deepEqual(item.key, key)));
    }
    items(collection, ...keysOrFilter) {
        const items = [];
        if (Array.isArray(keysOrFilter)) {
            KEYS: for (const key of keysOrFilter) {
                for (const item of this.itemsArray) {
                    if (item.collection === collection && fast_equals_1.deepEqual(item.key, key)) {
                        items.push(deep_clone_1.deepClone(item));
                        continue KEYS;
                    }
                }
            }
        }
        else {
            const filter = arguments.length > 1 && typeof arguments[1] === "function" && arguments[1];
            for (const item of this.itemsArray) {
                if (item.collection === collection && (!filter || filter(item.key, item.value))) {
                    items.push(deep_clone_1.deepClone(item));
                }
            }
        }
        return Promise.resolve(items);
    }
    update(collection, key, changes) {
        const item = this.itemsArray.find(item => item.collection === collection && fast_equals_1.deepEqual(item.key, key));
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