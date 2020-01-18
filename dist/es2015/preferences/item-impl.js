"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PreferencesItemImpl {
    constructor(collection, key, value) {
        this.ref = collection.itemRef(key);
        this.value = value;
    }
    get key() {
        return this.ref.key;
    }
}
exports.PreferencesItemImpl = PreferencesItemImpl;
//# sourceMappingURL=item-impl.js.map