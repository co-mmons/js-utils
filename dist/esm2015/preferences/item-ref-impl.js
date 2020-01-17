import * as tslib_1 from "tslib";
export class PreferencesItemRefImpl {
    constructor(collection, key) {
        this.collection = collection;
        this.key = key;
    }
    delete() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (yield this.collection.delete(this.key)).length === 1;
        });
    }
    value() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.collection.value(this.key);
        });
    }
    set(value, options) {
        return this.collection.set(this.key, value, options);
    }
    update(value) {
        return this.collection.update(this.key, value);
    }
}
//# sourceMappingURL=item-ref-impl.js.map