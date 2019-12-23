import {deepEqual} from "fast-equals";
import {PreferencesCollectionRefImpl} from "./collection-impl";
import {deepClone} from "./deep-clone";
import {PreferencesCollectionRef, PreferencesContainer, PreferencesFilter, PreferencesItem, PreferencesSetOptions} from "./interfaces";

export class MemoryPreferencesContainer implements PreferencesContainer {

    protected readonly itemsArray: PreferencesItem[] = [];

    protected changed(collection: string, key: any, operation: "new" | "update" | "delete") {
    }

    set(collection: string, key: any, value: any, options?: PreferencesSetOptions) {

        let item = this.itemsArray.find(item => item.collection === collection && deepEqual(item.key, key));

        if (item) {
            item.value = options && options.merge ? Object.assign({}, item.value, value) : deepClone(value);
            this.changed(collection, key, "update");
            return Promise.resolve(deepClone(item));

        } else {
            item = {collection: collection, key: deepClone(key), value: deepClone(value)};
            this.itemsArray.push(item);
            this.changed(collection, key, "new");
            return Promise.resolve(deepClone(item));
        }
    }

    get(collection: string, key: any) {
        const item = this.itemsArray.find(item => item.collection === collection && deepEqual(item.key, key));
        return Promise.resolve((item && deepClone(item)) || null);
    }

    delete(collection: string, ...keysOrFilter: Array<any | PreferencesFilter>) {

        const deleted: PreferencesItem[] = [];

        if (Array.isArray(keysOrFilter)) {

            KEYS: for (const key of keysOrFilter) {

                for (let i = 0; i < this.itemsArray.length; i++) {

                    if (this.itemsArray[i].collection === collection && deepEqual(this.itemsArray[i].key, key)) {

                        for (const item of this.itemsArray.splice(i, 1)) {
                            this.changed(collection, item.key, "delete");
                            deleted.push(deepClone(item));
                        }

                        continue KEYS;
                    }
                }
            }

        } else {

            const filter: PreferencesFilter<any> = arguments.length > 1 && typeof arguments[1] === "function" && arguments[1];

            for (let i = 0; i < this.itemsArray.length; i++) {
                if (this.itemsArray[i].collection === collection && (arguments.length === 0 || (filter && filter(this.itemsArray[i].key, this.itemsArray[i].value)))) {
                    for (const item of this.itemsArray.splice(i, 1)) {
                        this.changed(collection, item.key, "delete");
                        deleted.push(deepClone(item));
                    }
                }
            }
        }

        return Promise.resolve(deleted);
    }

    exists(collection: string, key: any): Promise<boolean> {
        return Promise.resolve(!!this.itemsArray.find(item => item.collection === collection && deepEqual(item.key, key)));
    }

    items(collection: string, ...keysOrFilter: Array<any | PreferencesFilter>) {

        const items: PreferencesItem[] = [];

        if (Array.isArray(keysOrFilter)) {

            KEYS: for (const key of keysOrFilter) {

                for (const item of this.itemsArray) {

                    if (item.collection === collection && deepEqual(item.key, key)) {
                        items.push(deepClone(item));
                        continue KEYS;
                    }
                }
            }

        } else {
            const filter: PreferencesFilter<any> = arguments.length > 1 && typeof arguments[1] === "function" && arguments[1];

            for (const item of this.itemsArray) {
                if (item.collection === collection && (!filter || filter(item.key, item.value))) {
                    items.push(deepClone(item));
                }
            }
        }

        return Promise.resolve(items);
    }

    update<Key = any, Value = any>(collection: string, key: Key, changes: Partial<Value>): Promise<PreferencesItem<Key, Value>> {

        const item = this.itemsArray.find(item => item.collection === collection && deepEqual(item.key, key));
        if (item) {

            if (changes) {
                item.value = Object.assign({}, item.value, changes);
                this.changed(collection, item.key, "update");
            }

            return Promise.resolve(deepClone(item));

        } else {
            return Promise.reject(new Error("Key not exists"));
        }
    }

    collection<Key, Value>(name: string): PreferencesCollectionRef<Key, Value> {
        return new PreferencesCollectionRefImpl(this, name);
    }
}
