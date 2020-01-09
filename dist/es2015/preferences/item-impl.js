"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PreferenceItemImpl {
    constructor(collection, key, value) {
        this.ref = collection.itemRef(key);
        this.value = value;
    }
    get key() {
        return this.ref.key;
    }
}
exports.PreferenceItemImpl = PreferenceItemImpl;
//# sourceMappingURL=item-impl.js.map