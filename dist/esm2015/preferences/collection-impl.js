import * as tslib_1 from "tslib";
import { PreferenceItemRefImpl } from "./item-impl";
export class PreferencesCollectionRefImpl {
    constructor(container, name) {
        this.container = container;
        this.name = name;
    }
    items(...keysOrFilter) {
        if (arguments.length === 0 || typeof arguments[0] === "function") {
            const filter = arguments.length > 0 && arguments[0];
            return new Promise((resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const preferences = [];
                try {
                    for (const pref of yield this.container.items(this.name, filter)) {
                        preferences.push(new PreferenceItemRefImpl(this, pref.key));
                    }
                }
                catch (error) {
                    return reject(error);
                }
                return resolve(preferences);
            }));
        }
        else if (Array.isArray(arguments[0])) {
            const items = [];
            for (const key of arguments[0]) {
                items.push(new PreferenceItemRefImpl(this, key));
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
        return new PreferenceItemRefImpl(this, key);
    }
    set(key, value) {
        return this.container.set(this.name, key, value);
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
    values(...keysOrFilter) {
        const filter = arguments.length > 0 && typeof arguments[0] === "function" && arguments[0];
        const keys = arguments.length > 0 && Array.isArray(arguments[0]) && arguments[0];
        return new Promise((resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const values = [];
            try {
                for (const item of yield this.container.items(this.name, keys || filter || null)) {
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
//# sourceMappingURL=collection-impl.js.map