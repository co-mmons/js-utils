import { __awaiter, __generator, __spreadArrays } from "tslib";
import { PreferencesItemRefImpl } from "./item-ref-impl";
var PreferencesCollectionRefImpl = /** @class */ (function () {
    function PreferencesCollectionRefImpl(container, name) {
        this.container = container;
        this.name = name;
    }
    PreferencesCollectionRefImpl.prototype.itemRef = function (key) {
        return new PreferencesItemRefImpl(this, key);
    };
    PreferencesCollectionRefImpl.prototype.items = function () {
        var _a;
        var args = arguments;
        var keys = arguments.length > 0 && new Array(arguments.length).fill(undefined).map(function (value, index) { return args[index]; });
        if (keys) {
            return (_a = this.container).items.apply(_a, __spreadArrays([this.name], keys));
        }
        else if (arguments.length === 0) {
            return this.container.items(this.name);
        }
    };
    PreferencesCollectionRefImpl.prototype.delete = function () {
        return this.container.delete(this.name, arguments[0]);
    };
    PreferencesCollectionRefImpl.prototype.exists = function (key) {
        return this.container.exists(this.name, key);
    };
    PreferencesCollectionRefImpl.prototype.item = function (key) {
        var items = this.container.items(this.name, key);
        return (items && items[0]) || undefined;
    };
    PreferencesCollectionRefImpl.prototype.set = function (key, value, options) {
        return this.container.set(this.name, key, value, options);
    };
    PreferencesCollectionRefImpl.prototype.update = function (key, value) {
        return this.container.update(this.name, key, value);
    };
    PreferencesCollectionRefImpl.prototype.value = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var item;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.container.get(this.name, key)];
                    case 1:
                        item = _a.sent();
                        return [2 /*return*/, (item && item.value) || null];
                }
            });
        });
    };
    PreferencesCollectionRefImpl.prototype.values = function () {
        var _this = this;
        var args = arguments;
        var keys = arguments.length > 0 && new Array(arguments.length).fill(undefined).map(function (value, index) { return args[index]; });
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var values, items, _i, _a, item, error_1;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        values = [];
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 6, , 7]);
                        items = void 0;
                        if (keys) {
                            items = (_b = this.container).items.apply(_b, __spreadArrays([this.name], keys));
                        }
                        else if (args.length === 0) {
                            items = this.container.items(this.name);
                        }
                        if (!items) return [3 /*break*/, 5];
                        _i = 0;
                        return [4 /*yield*/, items];
                    case 2:
                        _a = _c.sent();
                        _c.label = 3;
                    case 3:
                        if (!(_i < _a.length)) return [3 /*break*/, 5];
                        item = _a[_i];
                        values.push(item.value);
                        _c.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 3];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_1 = _c.sent();
                        return [2 /*return*/, reject(error_1)];
                    case 7: return [2 /*return*/, resolve(values)];
                }
            });
        }); });
    };
    PreferencesCollectionRefImpl.prototype.listen = function (listener) {
        return this.container.listen(listener, this.name);
    };
    return PreferencesCollectionRefImpl;
}());
export { PreferencesCollectionRefImpl };
//# sourceMappingURL=collection-impl.js.map