import { merge } from "./merge";
import { PreferencesCollectionRefImpl } from "./PreferencesCollectionRefImpl";
import { ContainerEventsManager } from "./ContainerEventsManager";
import { deepClone } from "./deepClone";
import { PreferencesItemImpl } from "./PreferencesItemImpl";
export class StoragePreferencesContainer {
    constructor(storage) {
        this.storage = storage;
        this.events = new ContainerEventsManager();
    }
    fireEvent(event) {
        this.events.fireEvent(Object.assign(event, { ref: new PreferencesCollectionRefImpl(this, event.collection).itemRef(event.key) }));
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
            return new PreferencesItemImpl(this.collection(item.collection), deepClone(item.key), deepClone(item.value), item.lastUpdate);
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
            item.lastUpdate = Date.now();
            const old = item.value;
            item.value = deepClone(options && options.merge ? merge(options.merge === "deep", item.value, value) : value);
            this.setStorageItem(itemKey, item);
            this.fireEvent({
                collection: collection,
                type: "update",
                key: deepClone(key),
                newValue: deepClone(item.value),
                oldValue: deepClone(old)
            });
        }
        else {
            item = { value: value, lastUpdate: Date.now() };
            this.setStorageItem(itemKey, item);
            this.fireEvent({
                collection: collection,
                type: "create",
                key: deepClone(key),
                newValue: deepClone(value)
            });
        }
        return Promise.resolve(this.newItem({ key, collection, value: item.value, lastUpdate: item.lastUpdate }));
    }
    get(collection, key) {
        const item = this.getStorageItem(this.storageKey(collection, key));
        return Promise.resolve(this.newItem(item && { collection, key, value: item.value, lastUpdate: item.lastUpdate }));
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
                        key: deepClone(key),
                        oldValue: deepClone(item.value)
                    });
                    deleted.push(this.newItem({ collection, key, value: item.value, lastUpdate: item.lastUpdate }));
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
                    key: deepClone(collectionAndKey[1]),
                    oldValue: deepClone(item.value)
                });
                deleted.push(this.newItem({ collection, key: collectionAndKey[1], value: item.value, lastUpdate: item.lastUpdate }));
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
                        items.push(this.newItem({ collection, key, value: item.value, lastUpdate: item.lastUpdate }));
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
                    items.push(this.newItem({ collection, key: collectionAndKey[1], value: item.value, lastUpdate: item.lastUpdate }));
                }
            }
        }
        return Promise.resolve(items);
    }
    update(collection, key, changes) {
        const storageKey = this.storageKey(collection, key);
        const rawItem = this.storage.getItem(storageKey);
        const lastUpdate = Date.now();
        if (rawItem) {
            const oldItem = JSON.parse(rawItem);
            let newValue = oldItem.value;
            if (changes) {
                newValue = Object.assign({}, newValue, changes);
                this.fireEvent({
                    collection: collection,
                    type: "update",
                    key: deepClone(key),
                    newValue: deepClone(newValue),
                    oldValue: (oldItem && deepClone(oldItem.value)) || null
                });
                this.setStorageItem(storageKey, { value: newValue, lastUpdate });
            }
            return Promise.resolve(this.newItem({ collection, key, value: newValue, lastUpdate }));
        }
        else {
            return Promise.reject(new Error("Key not exists"));
        }
    }
    collection(name) {
        return new PreferencesCollectionRefImpl(this, name);
    }
    listen(listener, collection) {
        return this.events.addListener(listener, collection);
    }
}
//# sourceMappingURL=StoragePreferencesContainer.js.map