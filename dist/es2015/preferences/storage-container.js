"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const collection_impl_1 = require("./collection-impl");
const container_events_manager_1 = require("./container-events-manager");
const deep_clone_1 = require("./deep-clone");
const item_impl_1 = require("./item-impl");
class StoragePreferencesContainer {
    constructor(storage) {
        this.storage = storage;
        this.events = new container_events_manager_1.ContainerEventsManager();
    }
    fireEvent(event) {
        this.events.fireEvent(Object.assign(event, { ref: new collection_impl_1.PreferencesCollectionRefImpl(this, event.collection).itemRef(event.key) }));
    }
    getStorageItem(storageKey) {
        return JSON.parse(this.storage.getItem(storageKey));
    }
    setStorageItem(storageKey, item) {
        this.storage.setItem(storageKey, JSON.stringify(item));
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
    newItem(item) {
        if (item) {
            return new item_impl_1.PreferencesItemImpl(this.collection(item.collection), deep_clone_1.deepClone(item.key), deep_clone_1.deepClone(item.value));
        }
        return undefined;
    }
    set(collection, key, value, options) {
        const itemKey = this.storageKey(collection, key);
        let item = this.getStorageItem(itemKey);
        if (value === undefined) {
            value = null;
        }
        if (item) {
            const old = item.value;
            item.value = deep_clone_1.deepClone(options && options.merge ? Object.assign({}, item.value, value) : value);
            this.setStorageItem(itemKey, item);
            this.fireEvent({
                collection: collection,
                type: "update",
                key: deep_clone_1.deepClone(key),
                newValue: deep_clone_1.deepClone(item.value),
                oldValue: deep_clone_1.deepClone(old)
            });
        }
        else {
            item = { value: value };
            this.setStorageItem(itemKey, item);
            this.fireEvent({
                collection: collection,
                type: "create",
                key: deep_clone_1.deepClone(key),
                newValue: deep_clone_1.deepClone(value)
            });
        }
        return Promise.resolve(this.newItem({ key, collection, value: item.value }));
    }
    get(collection, key) {
        const item = this.getStorageItem(this.storageKey(collection, key));
        return Promise.resolve(this.newItem(item && { collection, key, value: item.value }));
    }
    delete(collection, ...keys) {
        const deleted = [];
        KEYS: for (const key of keys) {
            const itemKey = this.storageKey(collection, key);
            for (let i = 0; i < this.storage.length; i++) {
                const storageKey = this.storage.key(i);
                if (itemKey === storageKey) {
                    const item = this.getStorageItem(storageKey);
                    this.storage.removeItem(storageKey);
                    this.fireEvent({
                        collection,
                        type: "delete",
                        key: deep_clone_1.deepClone(key),
                        oldValue: deep_clone_1.deepClone(item.value)
                    });
                    deleted.push(this.newItem({ collection, key, value: item.value }));
                    continue KEYS;
                }
            }
        }
        return Promise.resolve(deleted);
    }
    deleteAll(collection) {
        const deleted = [];
        for (let i = 0; i < this.storage.length; i++) {
            const storageKey = this.storage.key(i);
            const collectionAndKey = this.collectionAndKey(storageKey);
            if (collectionAndKey && collectionAndKey[0] === collection) {
                const item = this.getStorageItem(storageKey);
                this.storage.removeItem(storageKey);
                this.fireEvent({
                    collection,
                    type: "delete",
                    key: deep_clone_1.deepClone(collectionAndKey[1]),
                    oldValue: deep_clone_1.deepClone(item.value)
                });
                deleted.push(this.newItem({ collection, key: collectionAndKey[1], value: item.value }));
            }
        }
        return Promise.resolve(deleted);
    }
    exists(collection, key) {
        const item = this.getStorageItem(this.storageKey(collection, key));
        return Promise.resolve(!!item);
    }
    items(collection, keysToFilter) {
        const items = [];
        const args = arguments;
        const keys = arguments.length > 1 && new Array(arguments.length - 1).fill(undefined).map((value, index) => args[index + 1]);
        if (keys) {
            KEYS: for (const key of keys) {
                const itemKey = this.storageKey(collection, key);
                for (let i = 0; i < this.storage.length; i++) {
                    const storageKey = this.storage.key(i);
                    if (itemKey === storageKey) {
                        const item = this.getStorageItem(storageKey);
                        items.push(this.newItem({ collection, key, value: item.value }));
                        continue KEYS;
                    }
                }
            }
        }
        else if (arguments.length === 1) {
            for (let i = 0; i < this.storage.length; i++) {
                const storageKey = this.storage.key(i);
                const collectionAndKey = this.collectionAndKey(storageKey);
                if (collectionAndKey && collectionAndKey[0] === collection) {
                    const item = this.getStorageItem(storageKey);
                    items.push(this.newItem({ collection, key: collectionAndKey[1], value: item.value }));
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
                this.fireEvent({
                    collection: collection,
                    type: "update",
                    key: deep_clone_1.deepClone(key),
                    newValue: deep_clone_1.deepClone(newValue),
                    oldValue: (oldItem && deep_clone_1.deepClone(oldItem.value)) || null
                });
                this.setStorageItem(storageKey, { value: newValue });
            }
            return Promise.resolve(this.newItem({ collection, key, value: newValue }));
        }
        else {
            return Promise.reject(new Error("Key not exists"));
        }
    }
    collection(name) {
        return new collection_impl_1.PreferencesCollectionRefImpl(this, name);
    }
    listen(listener, collection) {
        return this.events.addListener(listener, collection);
    }
}
exports.StoragePreferencesContainer = StoragePreferencesContainer;
//# sourceMappingURL=storage-container.js.map