var PreferenceItemImpl = /** @class */ (function () {
    function PreferenceItemImpl(collection, key, value) {
        this.ref = collection.itemRef(key);
        this.value = value;
    }
    Object.defineProperty(PreferenceItemImpl.prototype, "key", {
        get: function () {
            return this.ref.key;
        },
        enumerable: true,
        configurable: true
    });
    return PreferenceItemImpl;
}());
export { PreferenceItemImpl };
//# sourceMappingURL=item-impl.js.map