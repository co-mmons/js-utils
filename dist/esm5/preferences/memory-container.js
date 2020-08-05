import { __values } from "tslib";
import { deepEqual } from "fast-equals";
import { PreferencesCollectionRefImpl } from "./collection-impl";
import { ContainerEventsManager } from "./container-events-manager";
import { deepClone } from "./deep-clone";
import { PreferencesItemImpl } from "./item-impl";
var MemoryPreferencesContainer = /** @class */ (function () {
    function MemoryPreferencesContainer() {
        this.memory = [];
        this.events = new ContainerEventsManager();
    }
    MemoryPreferencesContainer.prototype.fireEvent = function (event) {
        this.events.fireEvent(Object.assign(event, { ref: new PreferencesCollectionRefImpl(this, event.collection).itemRef(event.key) }));
    };
    MemoryPreferencesContainer.prototype.newItem = function (item) {
        if (item) {
            return new PreferencesItemImpl(this.collection(item.collection), deepClone(item.key), deepClone(item.value));
        }
        return undefined;
    };
    MemoryPreferencesContainer.prototype.set = function (collection, key, value, options) {
        var item = this.memory.find(function (item) { return item.collection === collection && deepEqual(item.key, key); });
        if (item) {
            var old = item.value;
            item.value = deepClone(options && options.merge ? Object.assign({}, item.value, value) : value);
            this.fireEvent({
                collection: collection,
                type: "update",
                key: deepClone(key),
                newValue: deepClone(item.value),
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
        var e_1, _a;
        var deleted = [];
        for (var i = this.memory.length - 1; i >= 0; i--) {
            if (this.memory[i].collection === collection) {
                try {
                    for (var _b = (e_1 = void 0, __values(this.memory.splice(i, 1))), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var item = _c.value;
                        this.fireEvent({
                            collection: collection,
                            type: "delete",
                            key: deepClone(item.key),
                            oldValue: deepClone(item.value)
                        });
                        deleted.push(this.newItem(item));
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
        }
        return Promise.resolve(deleted);
    };
    MemoryPreferencesContainer.prototype.delete = function (collection) {
        var e_2, _a, e_3, _b;
        var keys = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            keys[_i - 1] = arguments[_i];
        }
        var deleted = [];
        try {
            KEYS: for (var keys_1 = __values(keys), keys_1_1 = keys_1.next(); !keys_1_1.done; keys_1_1 = keys_1.next()) {
                var key = keys_1_1.value;
                for (var i = 0; i < this.memory.length; i++) {
                    if (this.memory[i].collection === collection && deepEqual(this.memory[i].key, key)) {
                        try {
                            for (var _c = (e_3 = void 0, __values(this.memory.splice(i, 1))), _d = _c.next(); !_d.done; _d = _c.next()) {
                                var item = _d.value;
                                this.fireEvent({
                                    collection: collection,
                                    type: "delete",
                                    key: deepClone(item.key),
                                    oldValue: deepClone(item.value)
                                });
                                deleted.push(this.newItem(item));
                            }
                        }
                        catch (e_3_1) { e_3 = { error: e_3_1 }; }
                        finally {
                            try {
                                if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                            }
                            finally { if (e_3) throw e_3.error; }
                        }
                        continue KEYS;
                    }
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (keys_1_1 && !keys_1_1.done && (_a = keys_1.return)) _a.call(keys_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return Promise.resolve(deleted);
    };
    MemoryPreferencesContainer.prototype.exists = function (collection, key) {
        return Promise.resolve(!!this.memory.find(function (item) { return item.collection === collection && deepEqual(item.key, key); }));
    };
    MemoryPreferencesContainer.prototype.items = function (collection, keysToFilter) {
        var e_4, _a, e_5, _b, e_6, _c;
        var items = [];
        var args = arguments;
        var keys = arguments.length > 1 && new Array(arguments.length - 1).fill(undefined).map(function (value, index) { return args[index + 1]; });
        if (keys) {
            try {
                KEYS: for (var keys_2 = __values(keys), keys_2_1 = keys_2.next(); !keys_2_1.done; keys_2_1 = keys_2.next()) {
                    var key = keys_2_1.value;
                    try {
                        for (var _d = (e_5 = void 0, __values(this.memory)), _e = _d.next(); !_e.done; _e = _d.next()) {
                            var item = _e.value;
                            if (item.collection === collection && deepEqual(item.key, key)) {
                                items.push(this.newItem(item));
                                continue KEYS;
                            }
                        }
                    }
                    catch (e_5_1) { e_5 = { error: e_5_1 }; }
                    finally {
                        try {
                            if (_e && !_e.done && (_b = _d.return)) _b.call(_d);
                        }
                        finally { if (e_5) throw e_5.error; }
                    }
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (keys_2_1 && !keys_2_1.done && (_a = keys_2.return)) _a.call(keys_2);
                }
                finally { if (e_4) throw e_4.error; }
            }
        }
        else if (arguments.length === 1) {
            try {
                for (var _f = __values(this.memory), _g = _f.next(); !_g.done; _g = _f.next()) {
                    var item = _g.value;
                    if (item.collection === collection) {
                        items.push(this.newItem(item));
                    }
                }
            }
            catch (e_6_1) { e_6 = { error: e_6_1 }; }
            finally {
                try {
                    if (_g && !_g.done && (_c = _f.return)) _c.call(_f);
                }
                finally { if (e_6) throw e_6.error; }
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