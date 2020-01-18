import * as tslib_1 from "tslib";
import { PreferencesItemRefImpl } from "./item-ref-impl";
export class PreferencesCollectionRefImpl {
    constructor(container, name) {
        this.container = container;
        this.name = name;
    }
    itemRef(key) {
        return new PreferencesItemRefImpl(this, key);
    }
    items() {
        const args = arguments;
        const keys = arguments.length > 0 && new Array(arguments.length).fill(undefined).map((value, index) => args[index]);
        if (keys) {
            return this.container.items(this.name, ...keys);
        }
        else if (arguments.length === 0) {
            return this.container.items(this.name);
        }
    }
    delete() {
        return this.container.delete(this.name, arguments[0]);
    }
    exists(key) {
        return this.container.exists(this.name, key);
    }
    item(key) {
        const items = this.container.items(this.name, key);
        return (items && items[0]) || undefined;
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
        const args = arguments;
        const keys = arguments.length > 0 && new Array(arguments.length).fill(undefined).map((value, index) => args[index]);
        return new Promise((resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const values = [];
            try {
                let items;
                if (keys) {
                    items = this.container.items(this.name, ...keys);
                }
                else if (args.length === 0) {
                    items = this.container.items(this.name);
                }
                if (items) {
                    for (const item of yield items) {
                        values.push(item.value);
                    }
                }
            }
            catch (error) {
                return reject(error);
            }
            return resolve(values);
        }));
    }
    listen(listener) {
        return this.container.listen(listener, this.name);
    }
}
//# sourceMappingURL=collection-impl.js.map