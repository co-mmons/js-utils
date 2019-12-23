import { deepEqual } from "fast-equals";
import { PreferencesCollectionRefImpl } from "./collection-impl";
import { deepClone } from "./deep-clone";
var MemoryPreferencesContainer = /** @class */ (function () {
    function MemoryPreferencesContainer() {
        this.itemsArray = [];
    }
    MemoryPreferencesContainer.prototype.changed = function (collection, key, operation) {
    };
    MemoryPreferencesContainer.prototype.set = function (collection, key, value, options) {
        var item = this.itemsArray.find(function (item) { return item.collection === collection && deepEqual(item.key, key); });
        if (item) {
            item.value = options && options.merge ? Object.assign({}, item.value, value) : deepClone(value);
            this.changed(collection, key, "update");
            return Promise.resolve(deepClone(item));
        }
        else {
            item = { collection: collection, key: deepClone(key), value: deepClone(value) };
            this.itemsArray.push(item);
            this.changed(collection, key, "new");
            return Promise.resolve(deepClone(item));
        }
    };
    MemoryPreferencesContainer.prototype.get = function (collection, key) {
        var item = this.itemsArray.find(function (item) { return item.collection === collection && deepEqual(item.key, key); });
        return Promise.resolve((item && deepClone(item)) || null);
    };
    MemoryPreferencesContainer.prototype.delete = function (collection) {
        var keysOrFilter = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            keysOrFilter[_i - 1] = arguments[_i];
        }
        var deleted = [];
        if (Array.isArray(keysOrFilter)) {
            KEYS: for (var _a = 0, keysOrFilter_1 = keysOrFilter; _a < keysOrFilter_1.length; _a++) {
                var key = keysOrFilter_1[_a];
                for (var i = 0; i < this.itemsArray.length; i++) {
                    if (this.itemsArray[i].collection === collection && deepEqual(this.itemsArray[i].key, key)) {
                        for (var _b = 0, _c = this.itemsArray.splice(i, 1); _b < _c.length; _b++) {
                            var item = _c[_b];
                            this.changed(collection, item.key, "delete");
                            deleted.push(deepClone(item));
                        }
                        continue KEYS;
                    }
                }
            }
        }
        else {
            var filter = arguments.length === 2 && typeof arguments[1] === "function" && arguments[1];
            for (var i = 0; i < this.itemsArray.length; i++) {
                if (this.itemsArray[i].collection === collection && (!filter || filter(this.itemsArray[i].key, this.itemsArray[i].value))) {
                    for (var _d = 0, _e = this.itemsArray.splice(i, 1); _d < _e.length; _d++) {
                        var item = _e[_d];
                        this.changed(collection, item.key, "delete");
                        deleted.push(deepClone(item));
                    }
                }
            }
        }
        return Promise.resolve(deleted);
    };
    MemoryPreferencesContainer.prototype.exists = function (collection, key) {
        return Promise.resolve(!!this.itemsArray.find(function (item) { return item.collection === collection && deepEqual(item.key, key); }));
    };
    MemoryPreferencesContainer.prototype.items = function (collection) {
        var keysOrFilter = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            keysOrFilter[_i - 1] = arguments[_i];
        }
        var items = [];
        if (Array.isArray(keysOrFilter)) {
            KEYS: for (var _a = 0, keysOrFilter_2 = keysOrFilter; _a < keysOrFilter_2.length; _a++) {
                var key = keysOrFilter_2[_a];
                for (var _b = 0, _c = this.itemsArray; _b < _c.length; _b++) {
                    var item = _c[_b];
                    if (item.collection === collection && deepEqual(item.key, key)) {
                        items.push(deepClone(item));
                        continue KEYS;
                    }
                }
            }
        }
        else {
            var filter = arguments.length === 2 && typeof arguments[1] === "function" && arguments[1];
            for (var _d = 0, _e = this.itemsArray; _d < _e.length; _d++) {
                var item = _e[_d];
                if (item.collection === collection && (!filter || filter(item.key, item.value))) {
                    items.push(deepClone(item));
                }
            }
        }
        return Promise.resolve(items);
    };
    MemoryPreferencesContainer.prototype.update = function (collection, key, changes) {
        var item = this.itemsArray.find(function (item) { return item.collection === collection && deepEqual(item.key, key); });
        if (item) {
            if (changes) {
                item.value = Object.assign({}, item.value, changes);
                this.changed(collection, item.key, "update");
            }
            return Promise.resolve(deepClone(item));
        }
        else {
            return Promise.reject(new Error("Key not exists"));
        }
    };
    MemoryPreferencesContainer.prototype.collection = function (name) {
        return new PreferencesCollectionRefImpl(this, name);
    };
    return MemoryPreferencesContainer;
}());
export { MemoryPreferencesContainer };
//# sourceMappingURL=memory-container.js.map