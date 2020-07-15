import { __awaiter, __generator } from "tslib";
var PreferencesItemRefImpl = /** @class */ (function () {
    function PreferencesItemRefImpl(collection, key) {
        this.collection = collection;
        this.key = key;
    }
    PreferencesItemRefImpl.prototype.delete = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.collection.delete(this.key)];
                    case 1: return [2 /*return*/, (_a.sent()).length === 1];
                }
            });
        });
    };
    PreferencesItemRefImpl.prototype.value = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.collection.value(this.key)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PreferencesItemRefImpl.prototype.set = function (value, options) {
        return this.collection.set(this.key, value, options);
    };
    PreferencesItemRefImpl.prototype.update = function (value) {
        return this.collection.update(this.key, value);
    };
    return PreferencesItemRefImpl;
}());
export { PreferencesItemRefImpl };
//# sourceMappingURL=item-ref-impl.js.map