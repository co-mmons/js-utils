import {PreferencesCollectionRefImpl} from "./collection-impl";
import {deepClone} from "./deep-clone";
import {PreferencesCollectionRef, PreferencesContainer, PreferencesFilter, PreferencesItem, PreferencesSetOptions} from "./interfaces";

interface StorageItem {
    value: any;
}

export class StoragePreferencesContainer implements PreferencesContainer {

    constructor(private readonly storage: typeof window.localStorage | typeof window.sessionStorage) {
    }

    private getStorageItem(storageKey: string) {
        return JSON.parse(this.storage.getItem(storageKey)) as StorageItem;
    }

    private setStorageItem(storageKey: string, item: StorageItem) {
        this.storage.setItem(storageKey, JSON.stringify(item));
    }

    private isCollectionStorageKey(collection: string, storageKey: string) {
        return storageKey.startsWith(collection + "/");
    }

    private storageKey(collection: string, key: any) {
        return `${collection}/${JSON.stringify(key)}`;
    }

    private realKey(collection: string, storageKey: any) {
        return JSON.parse(storageKey.replace(new RegExp(`^${collection}\/`), ""));
    }

    set(collection: string, key: any, value: any, options?: PreferencesSetOptions) {

        const itemKey = this.storageKey(collection, key);

        let item = this.getStorageItem(itemKey);

        if (item) {
            item.value = options && options.merge ? Object.assign({}, item.value, value) : value;
        } else {
            item = {value: value};
        }

        this.setStorageItem(itemKey, item);

        return Promise.resolve({key: deepClone(key), collection, value: deepClone(item.value)} as PreferencesItem);
    }

    get(collection: string, key: any) {
        const item = this.getStorageItem(this.storageKey(collection, key));
        return Promise.resolve((item && {collection, key: deepClone(key), value: item.value} as PreferencesItem) || null);
    }

    delete(collection: string, keysOrFilter?) {

        const deleted: PreferencesItem[] = [];

        const filter: PreferencesFilter<any> = arguments.length > 1 && typeof arguments[1] === "function" && arguments[1];
        const args = arguments;
        const keys: any[] = !filter && arguments.length > 1 && new Array(arguments.length - 1).map((value, index) => args[index + 1]);

        if (keys) {

            KEYS: for (const key of keys) {
                const itemKey = this.storageKey(collection, key);

                for (let i = 0; i < this.storage.length; i++) {
                    const storageKey = this.storage.key(i);

                    if (itemKey === storageKey) {
                        const item = this.getStorageItem(storageKey);
                        deleted.push({collection, key, value: item.value});
                        continue KEYS;
                    }
                }
            }

        } else if (arguments.length === 1 || filter) {

            for (let i = 0; i < this.storage.length; i++) {
                const storageKey = this.storage.key(i);

                if (this.isCollectionStorageKey(collection, storageKey)) {
                    const key = this.realKey(collection, storageKey);
                    const item = this.getStorageItem(storageKey);

                    if (!filter || filter(key, item.value)) {
                        deleted.push({collection, key, value: item.value});
                    }
                }
            }
        }

        return Promise.resolve(deleted);
    }

    exists(collection: string, key: any): Promise<boolean> {
        const item = this.getStorageItem(this.storageKey(collection, key));
        return Promise.resolve(!!item);
    }

    items(collection: string, ...keysOrFilter: Array<any | PreferencesFilter>) {

        const items: PreferencesItem[] = [];

        const filter: PreferencesFilter<any> = arguments.length > 1 && typeof arguments[1] === "function" && arguments[1];
        const args = arguments;
        const keys: any[] = !filter && arguments.length > 1 && new Array(arguments.length - 1).map((value, index) => args[index + 1]);

        if (keys) {

            KEYS: for (const key of keys) {
                const itemKey = this.storageKey(collection, key);

                for (let i = 0; i < this.storage.length; i++) {
                    const storageKey = this.storage.key(i);

                    if (itemKey === storageKey) {
                        const item = this.getStorageItem(storageKey);
                        items.push({collection, key, value: item.value});
                        continue KEYS;
                    }
                }
            }

        } else {

            for (let i = 0; i < this.storage.length; i++) {
                const storageKey = this.storage.key(i);

                if (this.isCollectionStorageKey(collection, storageKey)) {
                    const key = this.realKey(collection, storageKey);
                    const item = this.getStorageItem(storageKey);

                    if (!filter || filter(key, item.value)) {
                        items.push({collection, key, value: item.value});
                    }
                }
            }
        }

        return Promise.resolve(items);
    }

    update<Key = any, Value = any>(collection: string, key: Key, changes: Partial<Value>): Promise<PreferencesItem<Key, Value>> {

        const storageKey = this.storageKey(collection, key);
        const rawItem = this.storage.getItem(storageKey);

        if (rawItem) {

            const oldItem: StorageItem = JSON.parse(rawItem);
            let newValue: Value = oldItem.value;

            if (changes) {
                newValue = Object.assign({}, newValue, changes);
                this.setStorageItem(storageKey, {value: newValue});
            }

            return Promise.resolve({collection, key, value: deepClone(newValue)});

        } else {
            return Promise.reject(new Error("Key not exists"));
        }
    }

    collection<Key, Value>(name: string): PreferencesCollectionRef<Key, Value> {
        return new PreferencesCollectionRefImpl(this, name);
    }
}
