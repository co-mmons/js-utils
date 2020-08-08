import { __awaiter } from "tslib";
export class PreferencesItemRefImpl {
    constructor(collection, key) {
        this.collection = collection;
        this.key = key;
    }
    delete() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.collection.delete(this.key)).length === 1;
        });
    }
    value() {
        return __awaiter(this, void 0, void 0, function* () {
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
//# sourceMappingURL=PreferencesItemRefImpl.js.map