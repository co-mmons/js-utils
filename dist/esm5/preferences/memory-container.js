import { deepEqual } from "fast-equals";
import { PreferencesCollectionRefImpl } from "./collection-impl";
import { deepClone } from "./deep-clone";
var MemoryPreferencesContainer = /** @class */ (function () {
    function MemoryPreferencesContainer() {
        this.itemsArray = [];
    }
    MemoryPreferencesContainer.prototype.changed = function (collection, key, operation) {
    };
    MemoryPreferencesContainer.prototype.set = function (collection, key, value) {
        var item = this.itemsArray.find(function (item) { return item.collection === collection && deepEqual(item.key, key); });
        if (item) {
            item.value = value;
            this.changed(collection, key, "update");
            return Promise.resolve(deepClone(item));
        }
        else {
            item = { collection: collection, key: key, value: value };
            this.itemsArray.push(item);
            this.changed(collection, key, "new");
            return Promise.resolve(deepClone(item));
        }
    };
    MemoryPreferencesContainer.prototype.get = function (collection, key) {
        var item = this.itemsArray.find(function (item) { return item.collection === collection && deepEqual(item.key, key); });
        return Promise.resolve((item && deepClone(item)) || null);
    };
    MemoryPreferencesContainer.prototype.delete = function (collection, keysOrFilter) {
        var deleted = [];
        if (Array.isArray(keysOrFilter)) {
            KEYS: for (var _i = 0, keysOrFilter_1 = keysOrFilter; _i < keysOrFilter_1.length; _i++) {
                var key = keysOrFilter_1[_i];
                for (var i = 0; i < this.itemsArray.length; i++) {
                    if (this.itemsArray[i].collection === collection && deepEqual(this.itemsArray[i].key, key)) {
                        for (var _a = 0, _b = this.itemsArray.splice(i, 1); _a < _b.length; _a++) {
                            var item = _b[_a];
                            this.changed(collection, item.key, "delete");
                            deleted.push(deepClone(item));
                        }
                        continue KEYS;
                    }
                }
            }
        }
        else {
            for (var i = 0; i < this.itemsArray.length; i++) {
                if (this.itemsArray[i].collection === collection && (!keysOrFilter || keysOrFilter(this.itemsArray[i].key, this.itemsArray[i].value))) {
                    for (var _c = 0, _d = this.itemsArray.splice(i, 1); _c < _d.length; _c++) {
                        var item = _d[_c];
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
    MemoryPreferencesContainer.prototype.items = function (collection, keysOrFilter) {
        var items = [];
        if (Array.isArray(keysOrFilter)) {
            KEYS: for (var _i = 0, keysOrFilter_2 = keysOrFilter; _i < keysOrFilter_2.length; _i++) {
                var key = keysOrFilter_2[_i];
                for (var _a = 0, _b = this.itemsArray; _a < _b.length; _a++) {
                    var item = _b[_a];
                    if (item.collection === collection && deepEqual(item.key, key)) {
                        items.push(deepClone(item));
                        continue KEYS;
                    }
                }
            }
        }
        else {
            for (var _c = 0, _d = this.itemsArray; _c < _d.length; _c++) {
                var item = _d[_c];
                if (item.collection === collection && (!keysOrFilter || keysOrFilter(item.key, item.value))) {
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