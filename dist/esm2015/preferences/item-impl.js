export class PreferencesItemImpl {
    constructor(collection, key, value) {
        this.ref = collection.itemRef(key);
        this.value = value;
    }
    get key() {
        return this.ref.key;
    }
}
//# sourceMappingURL=item-impl.js.map