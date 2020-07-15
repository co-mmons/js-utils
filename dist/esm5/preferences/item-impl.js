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
export { PreferencesItemImpl };
//# sourceMappingURL=item-impl.js.map