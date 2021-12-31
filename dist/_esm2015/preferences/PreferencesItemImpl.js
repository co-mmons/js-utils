export class PreferencesItemImpl {
    constructor(collection, key, value, lastUpdate) {
        this.ref = collection.itemRef(key);
        this.value = value;
        this.lastUpdate = lastUpdate;
    }
    get key() {
        return this.ref.key;
    }
}
//# sourceMappingURL=PreferencesItemImpl.js.map