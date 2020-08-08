"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreferencesItemImpl = void 0;
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
//# sourceMappingURL=PreferencesItemImpl.js.map