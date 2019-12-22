"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
class PreferenceItemRefImpl {
    constructor(collection, key) {
        this.collection = collection;
        this.key = key;
    }
    delete() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (yield this.collection.delete(this.key)).length === 1;
        });
    }
    get() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.collection.value(this.key);
        });
    }
    set(value) {
        return this.collection.set(this.key, value);
    }
    update(value) {
        return this.collection.update(this.key, value);
    }
}
exports.PreferenceItemRefImpl = PreferenceItemRefImpl;
//# sourceMappingURL=item-impl.js.map