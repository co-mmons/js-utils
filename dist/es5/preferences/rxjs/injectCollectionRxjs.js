"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.injectCollectionRxjs = void 0;
var tslib_1 = require("tslib");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var PreferencesCollectionRefImpl_1 = require("../PreferencesCollectionRefImpl");
var deepClone_1 = require("../deepClone");
var PreferencesItemImpl_1 = require("../PreferencesItemImpl");
var CollectionItemsObserver = /** @class */ (function (_super) {
    tslib_1.__extends(CollectionItemsObserver, _super);
    function CollectionItemsObserver(collection) {
        var _this = _super.call(this, function (subscriber) { return _this.onSubscribe(subscriber); }) || this;
        _this.collection = collection;
        _this.subscribers = [];
        return _this;
    }
    CollectionItemsObserver.prototype.onSubscribe = function (subscriber) {
        var _this = this;
        this.collection.items().then(function (items) {
            subscriber.next(items);
            _this.subscribers.push(subscriber);
            if (!_this.unlisten) {
                _this.unlisten = _this.collection.listen(function (event) { return _this.listener(event); });
            }
        });
        return function () {
            var i = _this.subscribers.indexOf(subscriber);
            if (i > -1) {
                _this.subscribers.splice(i, 1);
            }
            if (_this.subscribers.length === 0 && _this.unlisten) {
                _this.unlisten();
            }
        };
    };
    CollectionItemsObserver.prototype.listener = function (event) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var items, _a, _b, subscriber;
            var e_1, _c;
            return tslib_1.__generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, this.collection.items()];
                    case 1:
                        items = _d.sent();
                        try {
                            for (_a = tslib_1.__values(this.subscribers), _b = _a.next(); !_b.done; _b = _a.next()) {
                                subscriber = _b.value;
                                subscriber.next(items.slice()
                                    .map(function (item) { return (item && new PreferencesItemImpl_1.PreferencesItemImpl(item.ref.collection, deepClone_1.deepClone(item.key), deepClone_1.deepClone(item.value))) || item; }));
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return CollectionItemsObserver;
}(rxjs_1.Observable));
function injectCollectionRxjs() {
    PreferencesCollectionRefImpl_1.PreferencesCollectionRefImpl.prototype.observeItems = function () {
        return new CollectionItemsObserver(this);
    };
    PreferencesCollectionRefImpl_1.PreferencesCollectionRefImpl.prototype.observeValues = function () {
        return new CollectionItemsObserver(this).pipe(operators_1.map(function (items) { return items.map(function (item) { return item.value; }); }));
    };
}
exports.injectCollectionRxjs = injectCollectionRxjs;
//# sourceMappingURL=injectCollectionRxjs.js.map