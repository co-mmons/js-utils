import { PreferencesCollectionRefImpl } from "./collection-impl";
import { deepClone } from "./deep-clone";
var StoragePreferencesContainer = /** @class */ (function () {
    function StoragePreferencesContainer(storage) {
        this.storage = storage;
    }
    StoragePreferencesContainer.prototype.getStorageItem = function (storageKey) {
        return JSON.parse(this.storage.getItem(storageKey));
    };
    StoragePreferencesContainer.prototype.setStorageItem = function (storageKey, item) {
        this.storage.setItem(storageKey, JSON.stringify(item));
    };
    StoragePreferencesContainer.prototype.isCollectionStorageKey = function (collection, storageKey) {
        return storageKey.startsWith(collection + "/");
    };
    StoragePreferencesContainer.prototype.storageKey = function (collection, key) {
        return collection + "/" + JSON.stringify(key);
    };
    StoragePreferencesContainer.prototype.realKey = function (collection, storageKey) {
        return JSON.parse(storageKey.replace(new RegExp("^" + collection + "/"), ""));
    };
    StoragePreferencesContainer.prototype.set = function (collection, key, value) {
        var itemKey = this.storageKey(collection, key);
        var item = this.getStorageItem(itemKey);
        if (item) {
            item.value = value;
        }
        else {
            item = { value: value };
        }
        this.setStorageItem(itemKey, item);
        return Promise.resolve({ key: deepClone(key), collection: collection, value: value });
    };
    StoragePreferencesContainer.prototype.get = function (collection, key) {
        var item = this.getStorageItem(this.storageKey(collection, key));
        return Promise.resolve((item && { collection: collection, key: deepClone(key), value: item.value }) || null);
    };
    StoragePreferencesContainer.prototype.delete = function (collection, keysOrFilter) {
        var deleted = [];
        if (Array.isArray(keysOrFilter)) {
            KEYS: for (var _i = 0, keysOrFilter_1 = keysOrFilter; _i < keysOrFilter_1.length; _i++) {
                var key = keysOrFilter_1[_i];
                var itemKey = this.storageKey(collection, key);
                for (var i = 0; i < this.storage.length; i++) {
                    var storageKey = this.storage.key(i);
                    if (itemKey === storageKey) {
                        var item = this.getStorageItem(storageKey);
                        deleted.push({ collection: collection, key: key, value: item.value });
                        continue KEYS;
                    }
                }
            }
        }
        else {
            for (var i = 0; i < this.storage.length; i++) {
                var storageKey = this.storage.key(i);
                if (this.isCollectionStorageKey(collection, storageKey)) {
                    var key = this.realKey(collection, storageKey);
                    var item = this.getStorageItem(storageKey);
                    if (!keysOrFilter || keysOrFilter(key, item.value)) {
                        deleted.push({ collection: collection, key: key, value: item.value });
                    }
                }
            }
        }
        return Promise.resolve(deleted);
    };
    StoragePreferencesContainer.prototype.exists = function (collection, key) {
        var item = this.getStorageItem(this.storageKey(collection, key));
        return Promise.resolve(!!item);
    };
    StoragePreferencesContainer.prototype.items = function (collection, keysOrFilter) {
        var items = [];
        if (Array.isArray(keysOrFilter)) {
            KEYS: for (var _i = 0, keysOrFilter_2 = keysOrFilter; _i < keysOrFilter_2.length; _i++) {
                var key = keysOrFilter_2[_i];
                var itemKey = this.storageKey(collection, key);
                for (var i = 0; i < this.storage.length; i++) {
                    var storageKey = this.storage.key(i);
                    if (itemKey === storageKey) {
                        var item = this.getStorageItem(storageKey);
                        items.push({ collection: collection, key: key, value: item.value });
                        continue KEYS;
                    }
                }
            }
        }
        else {
            for (var i = 0; i < this.storage.length; i++) {
                var storageKey = this.storage.key(i);
                if (this.isCollectionStorageKey(collection, storageKey)) {
                    var key = this.realKey(collection, storageKey);
                    var item = this.getStorageItem(storageKey);
                    if (!keysOrFilter || keysOrFilter(key, item.value)) {
                        items.push({ collection: collection, key: key, value: item.value });
                    }
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
                this.setStorageItem(storageKey, { value: newValue });
            }
            return Promise.resolve({ collection: collection, key: key, value: deepClone(newValue) });
        }
        else {
            return Promise.reject(new Error("Key not exists"));
        }
    };
    StoragePreferencesContainer.prototype.collection = function (name) {
        return new PreferencesCollectionRefImpl(this, name);
    };
    return StoragePreferencesContainer;
}());
export { StoragePreferencesContainer };
//# sourceMappingURL=storage-container.js.map