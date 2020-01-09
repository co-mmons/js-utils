import { __awaiter, __extends, __generator } from "tslib";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { PreferencesCollectionRefImpl } from "../collection-impl";
import { deepClone } from "../deep-clone";
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
        if (this.unlisten) {
            this.collection.listen(function (event) { return _this.listener(event); });
        }
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
            var items, _i, _a, subscriber;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.collection.items()];
                    case 1:
                        items = _b.sent();
                        for (_i = 0, _a = this.subscribers; _i < _a.length; _i++) {
                            subscriber = _a[_i];
                            subscriber.next(deepClone(items));
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