import {PreferencesCollectionRef, PreferencesContainer, PreferencesFilter, PreferencesItem, PreferencesItemRef, PreferencesSetOptions} from "./interfaces";
import {PreferenceItemRefImpl} from "./item-impl";

export class PreferencesCollectionRefImpl<Key, Value> implements PreferencesCollectionRef<Key, Value> {

    constructor(public readonly container: PreferencesContainer, public readonly name: string) {
    }

    items(...keysOrFilter: any): any {

        if (arguments.length === 0 || typeof arguments[0] === "function") {
            const filter: PreferencesFilter<Key, Value> = arguments.length > 0 && arguments[0];

            return new Promise<PreferencesItemRef<Key, Value>[]>(async (resolve, reject) => {
                const preferences: PreferencesItemRef<Key, Value>[] = [];

                try {

                    for (const pref of await this.container.items(this.name, filter)) {
                        preferences.push(new PreferenceItemRefImpl(this, pref.key));
                    }

                } catch (error) {
                    return reject(error);
                }

                return resolve(preferences);
            });

        } else if (Array.isArray(arguments[0])) {

            const items: PreferencesItemRef<Key, Value>[] = [];

            for (const key of arguments[0] as Key[]) {
                items.push(new PreferenceItemRefImpl(this, key));
            }

            return items;

        } else {
            throw new Error("Invalid arguments");
        }
    }

    delete(): Promise<PreferencesItem[]> {
        return this.container.delete(this.name, arguments[0]);
    }

    exists(key: Key): Promise<boolean> {
        return this.container.exists(this.name, key);
    }

    item(key: Key): PreferencesItemRef<Key, Value> {
        return new PreferenceItemRefImpl(this, key);
    }

    set(key: Key, value: Value | Partial<Value>, options?: PreferencesSetOptions) {
        return this.container.set(this.name, key, value, options);
    }

    update(key: Key, value: Partial<Value>) {
        return this.container.update(this.name, key, value);
    }

    async value(key: Key) {
        const item = await this.container.get(this.name, key);
        return (item && item.value) || null;
    }

    values(...keysOrFilter): Promise<Value[]> {

        const filter: PreferencesFilter<Key, Value> = arguments.length > 0 && typeof arguments[0] === "function" && arguments[0];
        const keys: Key[] = arguments.length > 0 && Array.isArray(arguments[0]) && arguments[0];

        return new Promise<Value[]>(async (resolve, reject) => {

            const values: Value[] = [];

            try {
                for (const item of await this.container.items(this.name, keys || filter || null)) {
                    values.push(item.value);
                }
            } catch (error) {
                return reject(error);
            }

            return resolve(values);
        });
    }


}
