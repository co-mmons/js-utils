"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const item_impl_1 = require("./item-impl");
class PreferencesCollectionRefImpl {
    constructor(container, name) {
        this.container = container;
        this.name = name;
    }
    items() {
        const filter = (arguments.length > 0 && typeof arguments[0] === "function" && arguments[0]) || undefined;
        const args = arguments;
        const keys = !filter && arguments.length > 0 && new Array(arguments.length).fill(undefined).map((value, index) => args[index]);
        if (arguments.length === 0 || filter) {
            return new Promise((resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const preferences = [];
                try {
                    for (const pref of yield (filter ? this.container.items(this.name, filter) : this.container.items(this.name))) {
                        preferences.push(new item_impl_1.PreferenceItemRefImpl(this, pref.key));
                    }
                }
                catch (error) {
                    return reject(error);
                }
                return resolve(preferences);
            }));
        }
        else if (keys) {
            const items = [];
            for (const key of keys) {
                if (key) {
                    items.push(new item_impl_1.PreferenceItemRefImpl(this, key));
                }
            }
            return items;
        }
        else {
            throw new Error("Invalid arguments");
        }
    }
    delete() {
        return this.container.delete(this.name, arguments[0]);
    }
    exists(key) {
        return this.container.exists(this.name, key);
    }
    item(key) {
        return new item_impl_1.PreferenceItemRefImpl(this, key);
    }
    set(key, value, options) {
        return this.container.set(this.name, key, value, options);
    }
    update(key, value) {
        return this.container.update(this.name, key, value);
    }
    value(key) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const item = yield this.container.get(this.name, key);
            return (item && item.value) || null;
        });
    }
    values() {
        const filter = (arguments.length > 0 && typeof arguments[0] === "function" && arguments[0]) || undefined;
        const args = arguments;
        const keys = !filter && arguments.length > 0 && new Array(arguments.length).fill(undefined).map((value, index) => args[index]);
        return new Promise((resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const values = [];
            try {
                let items;
                if (keys) {
                    items = this.container.items(this.name, ...keys);
                }
                else if (filter) {
                    items = this.container.items(this.name, filter);
                }
                else {
                    items = this.container.items(this.name);
                }
                for (const item of yield items) {
                    values.push(item.value);
                }
            }
            catch (error) {
                return reject(error);
            }
            return resolve(values);
        }));
    }
}
exports.PreferencesCollectionRefImpl = PreferencesCollectionRefImpl;
//# sourceMappingURL=collection-impl.js.map