"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryPreferencesContainer = void 0;
const fast_equals_1 = require("fast-equals");
const PreferencesCollectionRefImpl_1 = require("./PreferencesCollectionRefImpl");
const ContainerEventsManager_1 = require("./ContainerEventsManager");
const deepClone_1 = require("./deepClone");
const PreferencesItemImpl_1 = require("./PreferencesItemImpl");
class MemoryPreferencesContainer {
    constructor() {
        this.memory = [];
        this.events = new ContainerEventsManager_1.ContainerEventsManager();
    }
    fireEvent(event) {
        this.events.fireEvent(Object.assign(event, { ref: new PreferencesCollectionRefImpl_1.PreferencesCollectionRefImpl(this, event.collection).itemRef(event.key) }));
    }
    newItem(item) {
        if (item) {
            return new PreferencesItemImpl_1.PreferencesItemImpl(this.collection(item.collection), deepClone_1.deepClone(item.key), deepClone_1.deepClone(item.value));
        }
        return undefined;
    }
    set(collection, key, value, options) {
        let item = this.memory.find(item => item.collection === collection && fast_equals_1.deepEqual(item.key, key));
        if (item) {
            const old = item.value;
            item.value = deepClone_1.deepClone(options && options.merge ? Object.assign({}, item.value, value) : value);
            this.fireEvent({
                collection: collection,
                type: "update",
                key: deepClone_1.deepClone(key),
                newValue: deepClone_1.deepClone(item.value),
                oldValue: deepClone_1.deepClone(old)
            });
            return Promise.resolve(this.newItem(item));
        }
        else {
            this.memory.push(item = { collection: collection, key: deepClone_1.deepClone(key), value: deepClone_1.deepClone(value) });
            this.fireEvent({
                collection: collection,
                type: "create",
                key: deepClone_1.deepClone(key),
                newValue: deepClone_1.deepClone(value)
            });
            return Promise.resolve(this.newItem(item));
        }
    }
    get(collection, key) {
        const item = this.memory.find(item => item.collection === collection && fast_equals_1.deepEqual(item.key, key));
        return Promise.resolve(this.newItem(item || null));
    }
    deleteAll(collection) {
        const deleted = [];
        for (let i = this.memory.length - 1; i >= 0; i--) {
            if (this.memory[i].collection === collection) {
                for (const item of this.memory.splice(i, 1)) {
                    this.fireEvent({
                        collection,
                        type: "delete",
                        key: deepClone_1.deepClone(item.key),
                        oldValue: deepClone_1.deepClone(item.value)
                    });
                    deleted.push(this.newItem(item));
                }
            }
        }
        return Promise.resolve(deleted);
    }
    delete(collection, ...keys) {
        const deleted = [];
        KEYS: for (const key of keys) {
            for (let i = 0; i < this.memory.length; i++) {
                if (this.memory[i].collection === collection && fast_equals_1.deepEqual(this.memory[i].key, key)) {
                    for (const item of this.memory.splice(i, 1)) {
                        this.fireEvent({
                            collection,
                            type: "delete",
                            key: deepClone_1.deepClone(item.key),
                            oldValue: deepClone_1.deepClone(item.value)
                        });
                        deleted.push(this.newItem(item));
                    }
                    continue KEYS;
                }
            }
        }
        return Promise.resolve(deleted);
    }
    exists(collection, key) {
        return Promise.resolve(!!this.memory.find(item => item.collection === collection && fast_equals_1.deepEqual(item.key, key)));
    }
    items(collection, keysToFilter) {
        const items = [];
        const args = arguments;
        const keys = arguments.length > 1 && new Array(arguments.length - 1).fill(undefined).map((value, index) => args[index + 1]);
        if (keys) {
            KEYS: for (const key of keys) {
                for (const item of this.memory) {
                    if (item.collection === collection && fast_equals_1.deepEqual(item.key, key)) {
                        items.push(this.newItem(item));
                        continue KEYS;
                    }
                }
            }
        }
        else if (arguments.length === 1) {
            for (const item of this.memory) {
                if (item.collection === collection) {
                    items.push(this.newItem(item));
                }
            }
        }
        return Promise.resolve(items);
    }
    update(collection, key, changes) {
        const item = this.memory.find(item => item.collection === collection && fast_equals_1.deepEqual(item.key, key));
        if (item) {
            if (changes) {
                const old = item.value;
                item.value = Object.assign({}, item.value, changes);
                this.fireEvent({
                    collection: collection,
                    type: "update",
                    key: deepClone_1.deepClone(key),
                    newValue: deepClone_1.deepClone(item.value),
                    oldValue: deepClone_1.deepClone(old)
                });
            }
            return Promise.resolve(this.newItem(item));
        }
        else {
            return Promise.reject(new Error("Key not exists"));
        }
    }
    collection(name) {
        return new PreferencesCollectionRefImpl_1.PreferencesCollectionRefImpl(this, name);
    }
    listen(listener, collection) {
        return this.events.addListener(listener, collection);
    }
}
exports.MemoryPreferencesContainer = MemoryPreferencesContainer;
//# sourceMappingURL=MemoryPreferencesContainer.js.map