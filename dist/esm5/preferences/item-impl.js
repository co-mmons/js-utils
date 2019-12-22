import * as tslib_1 from "tslib";
var PreferenceItemRefImpl = /** @class */ (function () {
    function PreferenceItemRefImpl(collection, key) {
        this.collection = collection;
        this.key = key;
    }
    PreferenceItemRefImpl.prototype.delete = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.collection.delete(this.key)];
                    case 1: return [2 /*return*/, (_a.sent()).length === 1];
                }
            });
        });
    };
    PreferenceItemRefImpl.prototype.get = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.collection.value(this.key)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PreferenceItemRefImpl.prototype.set = function (value) {
        return this.collection.set(this.key, value);
    };
    PreferenceItemRefImpl.prototype.update = function (value) {
        return this.collection.update(this.key, value);
    };
    return PreferenceItemRefImpl;
}());
export { PreferenceItemRefImpl };
//# sourceMappingURL=item-impl.js.map