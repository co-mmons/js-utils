"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreferencesItemImpl = void 0;
var PreferencesItemImpl = /** @class */ (function () {
    function PreferencesItemImpl(collection, key, value) {
        this.ref = collection.itemRef(key);
        this.value = value;
    }
    Object.defineProperty(PreferencesItemImpl.prototype, "key", {
        get: function () {
            return this.ref.key;
        },
        enumerable: false,
        configurable: true
    });
    return PreferencesItemImpl;
}());
exports.PreferencesItemImpl = PreferencesItemImpl;
//# sourceMappingURL=PreferencesItemImpl.js.map