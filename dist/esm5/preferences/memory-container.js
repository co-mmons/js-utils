import { deepEqual } from "fast-equals";
import { PreferencesCollectionRefImpl } from "./collection-impl";
import { deepClone } from "./deep-clone";
import { PreferenceItemImpl } from "./item-impl";
import { ContainerEventsManager } from "./container-events-manager";
var MemoryPreferencesContainer = /** @class */ (function () {
    function MemoryPreferencesContainer() {
        this.memory = [];
        this.events = new ContainerEventsManager();
    }
    MemoryPreferencesContainer.prototype.fireEvent = function (event) {
    };
    MemoryPreferencesContainer.prototype.newItem = function (item) {
        if (item) {
            return new PreferenceItemImpl(this.collection(item.collection), deepClone(item.key), deepClone(item.value));
        }
        return undefined;
    };
    MemoryPreferencesContainer.prototype.set = function (collection, key, value, options) {
        var item = this.memory.find(function (item) { return item.collection === collection && deepEqual(item.key, key); });
        if (item) {
            var old = item.value;
            item.value = options && options.merge ? Object.assign({}, item.value, value) : deepClone(value);
            this.fireEvent({
                collection: collection,
                type: "update",
                key: deepClone(key),
                newValue: deepClone(value),
                oldValue: deepClone(old)
            });
            return Promise.resolve(this.newItem(item));
        }
        else {
            this.memory.push(item = { collection: collection, key: deepClone(key), value: deepClone(value) });
            this.fireEvent({
                collection: collection,
                type: "create",
                key: deepClone(key),
                newValue: deepClone(value)
            });
            return Promise.resolve(this.newItem(item));
        }
    };
    MemoryPreferencesContainer.prototype.get = function (collection, key) {
        var item = this.memory.find(function (item) { return item.collection === collection && deepEqual(item.key, key); });
        return Promise.resolve(this.newItem(item || null));
    };
    MemoryPreferencesContainer.prototype.deleteAll = function (collection) {
        var deleted = [];
        for (var i = this.memory.length - 1; i >= 0; i--) {
            if (this.memory[i].collection === collection) {
                for (var _i = 0, _a = this.memory.splice(i, 1); _i < _a.length; _i++) {
                    var item = _a[_i];
                    this.fireEvent({
                        collection: collection,
                        type: "delete",
                        key: deepClone(item.key),
                        oldValue: deepClone(item.value)
                    });
                    deleted.push(this.newItem(item));
                }
            }
        }
        return Promise.resolve(deleted);
    };
    MemoryPreferencesContainer.prototype.delete = function (collection) {
        var keys = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            keys[_i - 1] = arguments[_i];
        }
        var deleted = [];
        KEYS: for (var _a = 0, keys_1 = keys; _a < keys_1.length; _a++) {
            var key = keys_1[_a];
            for (var i = 0; i < this.memory.length; i++) {
                if (this.memory[i].collection === collection && deepEqual(this.memory[i].key, key)) {
                    for (var _b = 0, _c = this.memory.splice(i, 1); _b < _c.length; _b++) {
                        var item = _c[_b];
                        this.fireEvent({
                            collection: collection,
                            type: "delete",
                            key: deepClone(item.key),
                            oldValue: deepClone(item.value)
                        });
                        deleted.push(this.newItem(item));
                    }
                    continue KEYS;
                }
            }
        }
        return Promise.resolve(deleted);
    };
    MemoryPreferencesContainer.prototype.exists = function (collection, key) {
        return Promise.resolve(!!this.memory.find(function (item) { return item.collection === collection && deepEqual(item.key, key); }));
    };
    MemoryPreferencesContainer.prototype.items = function (collection, keysToFilter) {
        var items = [];
        var args = arguments;
        var keys = arguments.length > 1 && new Array(arguments.length - 1).fill(undefined).map(function (value, index) { return args[index + 1]; });
        if (keys) {
            KEYS: for (var _i = 0, keys_2 = keys; _i < keys_2.length; _i++) {
                var key = keys_2[_i];
                for (var _a = 0, _b = this.memory; _a < _b.length; _a++) {
                    var item = _b[_a];
                    if (item.collection === collection && deepEqual(item.key, key)) {
                        items.push(this.newItem(item));
                        continue KEYS;
                    }
                }
            }
        }
        else {
            for (var _c = 0, _d = this.memory; _c < _d.length; _c++) {
                var item = _d[_c];
                if (item.collection === collection) {
                    items.push(this.newItem(item));
                }
            }
        }
        return Promise.resolve(items);
    };
    MemoryPreferencesContainer.prototype.update = function (collection, key, changes) {
        var item = this.memory.find(function (item) { return item.collection === collection && deepEqual(item.key, key); });
        if (item) {
            if (changes) {
                var old = item.value;
                item.value = Object.assign({}, item.value, changes);
                this.fireEvent({
                    collection: collection,
                    type: "update",
                    key: deepClone(key),
                    newValue: deepClone(item.value),
                    oldValue: deepClone(old)
                });
            }
            return Promise.resolve(this.newItem(item));
        }
        else {
            return Promise.reject(new Error("Key not exists"));
        }
    };
    MemoryPreferencesContainer.prototype.collection = function (name) {
        return new PreferencesCollectionRefImpl(this, name);
    };
    MemoryPreferencesContainer.prototype.listen = function (listener, collection) {
        return this.events.addListener(listener, collection);
    };
    return MemoryPreferencesContainer;
}());
export { MemoryPreferencesContainer };
//# sourceMappingURL=memory-container.js.map