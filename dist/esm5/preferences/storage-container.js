import { PreferencesCollectionRefImpl } from "./collection-impl";
import { ContainerEventsManager } from "./container-events-manager";
import { deepClone } from "./deep-clone";
import { PreferenceItemImpl } from "./item-impl";
var StoragePreferencesContainer = /** @class */ (function () {
    function StoragePreferencesContainer(storage) {
        this.storage = storage;
        this.events = new ContainerEventsManager();
    }
    StoragePreferencesContainer.prototype.fireEvent = function (event) {
    };
    StoragePreferencesContainer.prototype.getStorageItem = function (storageKey) {
        return JSON.parse(this.storage.getItem(storageKey));
    };
    StoragePreferencesContainer.prototype.setStorageItem = function (storageKey, item) {
        this.storage.setItem(storageKey, JSON.stringify(item));
    };
    StoragePreferencesContainer.prototype.storageKey = function (collection, key) {
        return JSON.stringify([collection, key]);
    };
    StoragePreferencesContainer.prototype.collectionAndKey = function (storageKey) {
        if (storageKey.startsWith("[") && storageKey.endsWith("]")) {
            try {
                var collectionAndKey = JSON.parse(storageKey);
                return (Array.isArray(collectionAndKey) && collectionAndKey.length === 2 && typeof collectionAndKey[0] === "string" && collectionAndKey) || null;
            }
            catch (e) {
                console.warn(e);
            }
        }
        return null;
    };
    StoragePreferencesContainer.prototype.newItem = function (item) {
        if (item) {
            return new PreferenceItemImpl(this.collection(item.collection), deepClone(item.key), deepClone(item.value));
        }
        return undefined;
    };
    StoragePreferencesContainer.prototype.set = function (collection, key, value, options) {
        var itemKey = this.storageKey(collection, key);
        var item = this.getStorageItem(itemKey);
        if (value === undefined) {
            value = null;
        }
        if (item) {
            var old = item.value;
            item.value = options && options.merge ? Object.assign({}, item.value, value) : value;
            this.fireEvent({
                collection: collection,
                type: "update",
                key: deepClone(key),
                newValue: deepClone(value),
                oldValue: deepClone(old)
            });
        }
        else {
            item = { value: value };
            this.fireEvent({
                collection: collection,
                type: "create",
                key: deepClone(key),
                newValue: deepClone(value)
            });
        }
        this.setStorageItem(itemKey, item);
        return Promise.resolve(this.newItem({ key: key, collection: collection, value: item.value }));
    };
    StoragePreferencesContainer.prototype.get = function (collection, key) {
        var item = this.getStorageItem(this.storageKey(collection, key));
        return Promise.resolve(this.newItem(item && { collection: collection, key: key, value: item.value }));
    };
    StoragePreferencesContainer.prototype.delete = function (collection) {
        var keys = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            keys[_i - 1] = arguments[_i];
        }
        var deleted = [];
        KEYS: for (var _a = 0, keys_1 = keys; _a < keys_1.length; _a++) {
            var key = keys_1[_a];
            var itemKey = this.storageKey(collection, key);
            for (var i = 0; i < this.storage.length; i++) {
                var storageKey = this.storage.key(i);
                if (itemKey === storageKey) {
                    var item = this.getStorageItem(storageKey);
                    this.storage.removeItem(storageKey);
                    this.fireEvent({
                        collection: collection,
                        type: "delete",
                        key: deepClone(key),
                        oldValue: deepClone(item.value)
                    });
                    deleted.push(this.newItem({ collection: collection, key: key, value: item.value }));
                    continue KEYS;
                }
            }
        }
        return Promise.resolve(deleted);
    };
    StoragePreferencesContainer.prototype.deleteAll = function (collection) {
        var deleted = [];
        for (var i = 0; i < this.storage.length; i++) {
            var storageKey = this.storage.key(i);
            var collectionAndKey = this.collectionAndKey(storageKey);
            if (collectionAndKey && collectionAndKey[0] === collection) {
                var item = this.getStorageItem(storageKey);
                this.storage.removeItem(storageKey);
                this.fireEvent({
                    collection: collection,
                    type: "delete",
                    key: deepClone(collectionAndKey[1]),
                    oldValue: deepClone(item.value)
                });
                deleted.push(this.newItem({ collection: collection, key: collectionAndKey[1], value: item.value }));
            }
        }
        return Promise.resolve(deleted);
    };
    StoragePreferencesContainer.prototype.exists = function (collection, key) {
        var item = this.getStorageItem(this.storageKey(collection, key));
        return Promise.resolve(!!item);
    };
    StoragePreferencesContainer.prototype.items = function (collection, keysToFilter) {
        var items = [];
        var args = arguments;
        var keys = arguments.length > 1 && new Array(arguments.length - 1).fill(undefined).map(function (value, index) { return args[index + 1]; });
        if (keys) {
            KEYS: for (var _i = 0, keys_2 = keys; _i < keys_2.length; _i++) {
                var key = keys_2[_i];
                var itemKey = this.storageKey(collection, key);
                for (var i = 0; i < this.storage.length; i++) {
                    var storageKey = this.storage.key(i);
                    if (itemKey === storageKey) {
                        var item = this.getStorageItem(storageKey);
                        items.push(this.newItem({ collection: collection, key: key, value: item.value }));
                        continue KEYS;
                    }
                }
            }
        }
        else {
            for (var i = 0; i < this.storage.length; i++) {
                var storageKey = this.storage.key(i);
                var collectionAndKey = this.collectionAndKey(storageKey);
                if (collectionAndKey && collectionAndKey[0] === collection) {
                    var item = this.getStorageItem(storageKey);
                    items.push(this.newItem({ collection: collection, key: collectionAndKey[1], value: item.value }));
                }
            }
        }
        return Promise.resolve(items);
    };
    StoragePreferencesContainer.prototype.update = function (collection, key, changes) {
        var storageKey = this.storageKey(collection, key);
        var rawItem = this.storage.getItem(storageKey);
        if (rawItem) {
            var oldItem = JSON.parse(rawItem);
            var newValue = oldItem.value;
            if (changes) {
                newValue = Object.assign({}, newValue, changes);
                this.fireEvent({
                    collection: collection,
                    type: "update",
                    key: deepClone(key),
                    newValue: deepClone(newValue),
                    oldValue: (oldItem && deepClone(oldItem.value)) || null
                });
                this.setStorageItem(storageKey, { value: newValue });
            }
            return Promise.resolve(this.newItem({ collection: collection, key: key, value: newValue }));
        }
        else {
            return Promise.reject(new Error("Key not exists"));
        }
    };
    StoragePreferencesContainer.prototype.collection = function (name) {
        return new PreferencesCollectionRefImpl(this, name);
    };
    StoragePreferencesContainer.prototype.listen = function (listener, collection) {
        return this.events.addListener(listener, collection);
    };
    return StoragePreferencesContainer;
}());
export { StoragePreferencesContainer };
//# sourceMappingURL=storage-container.js.map