import { __awaiter, __extends, __generator, __values } from "tslib";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { PreferencesCollectionRefImpl } from "../collection-impl";
import { deepClone } from "../deep-clone";
import { PreferencesItemImpl } from "../item-impl";
var CollectionItemsObserver = /** @class */ (function (_super) {
    __extends(CollectionItemsObserver, _super);
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
        return __awaiter(this, void 0, void 0, function () {
            var items, _a, _b, subscriber;
            var e_1, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, this.collection.items()];
                    case 1:
                        items = _d.sent();
                        try {
                            for (_a = __values(this.subscribers), _b = _a.next(); !_b.done; _b = _a.next()) {
                                subscriber = _b.value;
                                subscriber.next(items.slice()
                                    .map(function (item) { return (item && new PreferencesItemImpl(item.ref.collection, deepClone(item.key), deepClone(item.value))) || item; }));
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
}(Observable));
export function injectCollectionRxjs() {
    PreferencesCollectionRefImpl.prototype.observeItems = function () {
        return new CollectionItemsObserver(this);
    };
    PreferencesCollectionRefImpl.prototype.observeValues = function () {
        return new CollectionItemsObserver(this).pipe(map(function (items) { return items.map(function (item) { return item.value; }); }));
    };
}
//# sourceMappingURL=collection.js.map