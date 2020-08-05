"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreferencesCollectionRefImpl = void 0;
var tslib_1 = require("tslib");
var item_ref_impl_1 = require("./item-ref-impl");
var PreferencesCollectionRefImpl = /** @class */ (function () {
    function PreferencesCollectionRefImpl(container, name) {
        this.container = container;
        this.name = name;
    }
    PreferencesCollectionRefImpl.prototype.itemRef = function (key) {
        return new item_ref_impl_1.PreferencesItemRefImpl(this, key);
    };
    PreferencesCollectionRefImpl.prototype.items = function () {
        var _a;
        var args = arguments;
        var keys = arguments.length > 0 && new Array(arguments.length).fill(undefined).map(function (value, index) { return args[index]; });
        if (keys) {
            return (_a = this.container).items.apply(_a, tslib_1.__spread([this.name], keys));
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var item;
            return tslib_1.__generator(this, function (_a) {
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
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var values, items, _a, _b, item, e_1_1, error_1;
            var _c, e_1, _d;
            return tslib_1.__generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        values = [];
                        _e.label = 1;
                    case 1:
                        _e.trys.push([1, 10, , 11]);
                        items = void 0;
                        if (keys) {
                            items = (_c = this.container).items.apply(_c, tslib_1.__spread([this.name], keys));
                        }
                        else if (args.length === 0) {
                            items = this.container.items(this.name);
                        }
                        if (!items) return [3 /*break*/, 9];
                        _e.label = 2;
                    case 2:
                        _e.trys.push([2, 7, 8, 9]);
                        return [4 /*yield*/, items];
                    case 3:
                        _a = tslib_1.__values.apply(void 0, [_e.sent()]), _b = _a.next();
                        _e.label = 4;
                    case 4:
                        if (!!_b.done) return [3 /*break*/, 6];
                        item = _b.value;
                        values.push(item.value);
                        _e.label = 5;
                    case 5:
                        _b = _a.next();
                        return [3 /*break*/, 4];
                    case 6: return [3 /*break*/, 9];
                    case 7:
                        e_1_1 = _e.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 9];
                    case 8:
                        try {
                            if (_b && !_b.done && (_d = _a.return)) _d.call(_a);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        error_1 = _e.sent();
                        return [2 /*return*/, reject(error_1)];
                    case 11: return [2 /*return*/, resolve(values)];
                }
            });
        }); });
    };
    PreferencesCollectionRefImpl.prototype.listen = function (listener) {
        return this.container.listen(listener, this.name);
    };
    return PreferencesCollectionRefImpl;
}());
exports.PreferencesCollectionRefImpl = PreferencesCollectionRefImpl;
//# sourceMappingURL=collection-impl.js.map