"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const collection_impl_1 = require("./collection-impl");
const deep_clone_1 = require("./deep-clone");
class StoragePreferencesContainer {
    constructor(storage) {
        this.storage = storage;
    }
    getStorageItem(storageKey) {
        return JSON.parse(this.storage.getItem(storageKey));
    }
    setStorageItem(storageKey, item) {
        this.storage.setItem(storageKey, JSON.stringify(item));
    }
    isPrefsStorageKey(collection, storageKey) {
        return storageKey.startsWith("[") && storageKey.endsWith("]");
    }
    storageKey(collection, key) {
        return JSON.stringify([collection, key]);
    }
    collectionAndKey(storageKey) {
        if (storageKey.startsWith("[") && storageKey.endsWith("]")) {
            try {
                const collectionAndKey = JSON.parse(storageKey);
                return (Array.isArray(collectionAndKey) && collectionAndKey.length === 2 && typeof collectionAndKey[0] === "string" && collectionAndKey) || null;
            }
            catch (e) {
                console.warn(e);
            }
        }
        return null;
    }
    set(collection, key, value, options) {
        const itemKey = this.storageKey(collection, key);
        let item = this.getStorageItem(itemKey);
        if (item) {
            item.value = options && options.merge ? Object.assign({}, item.value, value) : value;
        }
        else {
            item = { value: value };
        }
        if (item.value === undefined) {
            item.value = null;
        }
        this.setStorageItem(itemKey, item);
        return Promise.resolve({ key: deep_clone_1.deepClone(key), collection, value: deep_clone_1.deepClone(item.value) });
    }
    get(collection, key) {
        const item = this.getStorageItem(this.storageKey(collection, key));
        return Promise.resolve((item && { collection, key: deep_clone_1.deepClone(key), value: item.value }) || null);
    }
    delete(collection, keysOrFilter) {
        const deleted = [];
        const filter = arguments.length > 1 && typeof arguments[1] === "function" && arguments[1];
        const args = arguments;
        const keys = !filter && arguments.length > 1 && new Array(arguments.length - 1).fill(undefined).map((value, index) => args[index + 1]);
        if (keys) {
            KEYS: for (const key of keys) {
                const itemKey = this.storageKey(collection, key);
                for (let i = 0; i < this.storage.length; i++) {
                    const storageKey = this.storage.key(i);
                    if (itemKey === storageKey) {
                        const item = this.getStorageItem(storageKey);
                        deleted.push({ collection, key, value: item.value });
                        this.storage.removeItem(storageKey);
                        continue KEYS;
                    }
                }
            }
        }
        else if (arguments.length === 1 || filter) {
            for (let i = 0; i < this.storage.length; i++) {
                const storageKey = this.storage.key(i);
                const collectionAndKey = this.collectionAndKey(storageKey);
                if (collectionAndKey && collectionAndKey[0] === collection) {
                    const item = this.getStorageItem(storageKey);
                    if (!filter || filter(collectionAndKey[1], item.value)) {
                        this.storage.removeItem(storageKey);
                        deleted.push({ collection, key: collectionAndKey[1], value: item.value });
                    }
                }
            }
        }
        return Promise.resolve(deleted);
    }
    exists(collection, key) {
        const item = this.getStorageItem(this.storageKey(collection, key));
        return Promise.resolve(!!item);
    }
    items(collection, ...keysOrFilter) {
        const items = [];
        const filter = arguments.length > 1 && typeof arguments[1] === "function" && arguments[1];
        const args = arguments;
        const keys = !filter && arguments.length > 1 && new Array(arguments.length - 1).fill(undefined).map((value, index) => args[index + 1]);
        if (keys) {
            KEYS: for (const key of keys) {
                const itemKey = this.storageKey(collection, key);
                for (let i = 0; i < this.storage.length; i++) {
                    const storageKey = this.storage.key(i);
                    if (itemKey === storageKey) {
                        const item = this.getStorageItem(storageKey);
                        items.push({ collection, key, value: item.value });
                        continue KEYS;
                    }
                }
            }
        }
        else {
            for (let i = 0; i < this.storage.length; i++) {
                const storageKey = this.storage.key(i);
                const collectionAndKey = this.collectionAndKey(storageKey);
                if (collectionAndKey && collectionAndKey[0] === collection) {
                    const item = this.getStorageItem(storageKey);
                    if (!filter || filter(collectionAndKey[1], item.value)) {
                        items.push({ collection, key: collectionAndKey[1], value: item.value });
                    }
                }
            }
        }
        return Promise.resolve(items);
    }
    update(collection, key, changes) {
        const storageKey = this.storageKey(collection, key);
        const rawItem = this.storage.getItem(storageKey);
        if (rawItem) {
            const oldItem = JSON.parse(rawItem);
            let newValue = oldItem.value;
            if (changes) {
                newValue = Object.assign({}, newValue, changes);
                if (newValue === undefined) {
                    newValue = null;
                }
                this.setStorageItem(storageKey, { value: newValue });
            }
            return Promise.resolve({ collection, key, value: deep_clone_1.deepClone(newValue) });
        }
        else {
            return Promise.reject(new Error("Key not exists"));
        }
    }
    collection(name) {
        return new collection_impl_1.PreferencesCollectionRefImpl(this, name);
    }
}
exports.StoragePreferencesContainer = StoragePreferencesContainer;
//# sourceMappingURL=storage-container.js.map