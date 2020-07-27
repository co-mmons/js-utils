"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoragePreferencesContainer = void 0;
var collection_impl_1 = require("./collection-impl");
var container_events_manager_1 = require("./container-events-manager");
var deep_clone_1 = require("./deep-clone");
var item_impl_1 = require("./item-impl");
var StoragePreferencesContainer = /** @class */ (function () {
    function StoragePreferencesContainer(storage) {
        this.storage = storage;
        this.events = new container_events_manager_1.ContainerEventsManager();
    }
    StoragePreferencesContainer.prototype.fireEvent = function (event) {
        this.events.fireEvent(Object.assign(event, { ref: new collection_impl_1.PreferencesCollectionRefImpl(this, event.collection).itemRef(event.key) }));
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
            return new item_impl_1.PreferencesItemImpl(this.collection(item.collection), deep_clone_1.deepClone(item.key), deep_clone_1.deepClone(item.value));
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
                        key: deep_clone_1.deepClone(key),
                        oldValue: deep_clone_1.deepClone(item.value)
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
                    key: deep_clone_1.deepClone(collectionAndKey[1]),
                    oldValue: deep_clone_1.deepClone(item.value)
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
        else if (arguments.length === 1) {
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
                    key: deep_clone_1.deepClone(key),
                    newValue: deep_clone_1.deepClone(newValue),
                    oldValue: (oldItem && deep_clone_1.deepClone(oldItem.value)) || null
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
        return new collection_impl_1.PreferencesCollectionRefImpl(this, name);
    };
    StoragePreferencesContainer.prototype.listen = function (listener, collection) {
        return this.events.addListener(listener, collection);
    };
    return StoragePreferencesContainer;
}());
exports.StoragePreferencesContainer = StoragePreferencesContainer;
//# sourceMappingURL=storage-container.js.map