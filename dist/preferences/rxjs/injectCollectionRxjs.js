"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.injectCollectionRxjs = void 0;
const tslib_1 = require("tslib");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const PreferencesCollectionRefImpl_1 = require("../PreferencesCollectionRefImpl");
const deepClone_1 = require("../deepClone");
const PreferencesItemImpl_1 = require("../PreferencesItemImpl");
class CollectionItemsObserver extends rxjs_1.Observable {
    constructor(collection) {
        super(subscriber => this.onSubscribe(subscriber));
        this.collection = collection;
        this.subscribers = [];
    }
    onSubscribe(subscriber) {
        this.collection.items().then(items => {
            subscriber.next(items);
            this.subscribers.push(subscriber);
            if (!this.unlisten) {
                this.unlisten = this.collection.listen(event => this.listener(event));
            }
        });
        return () => {
            const i = this.subscribers.indexOf(subscriber);
            if (i > -1) {
                this.subscribers.splice(i, 1);
            }
            if (this.subscribers.length === 0 && this.unlisten) {
                this.unlisten();
            }
        };
    }
    listener(event) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const items = yield this.collection.items();
            for (const subscriber of this.subscribers) {
                subscriber.next(items.slice()
                    .map(item => (item && new PreferencesItemImpl_1.PreferencesItemImpl(item.ref.collection, (0, deepClone_1.deepClone)(item.key), (0, deepClone_1.deepClone)(item.value), item.lastUpdate)) || item));
            }
        });
    }
}
function injectCollectionRxjs() {
    PreferencesCollectionRefImpl_1.PreferencesCollectionRefImpl.prototype.observeItems = function () {
        return new CollectionItemsObserver(this);
    };
    PreferencesCollectionRefImpl_1.PreferencesCollectionRefImpl.prototype.observeValues = function () {
        return new CollectionItemsObserver(this).pipe((0, operators_1.map)(items => items.map(item => item.value)));
    };
}
exports.injectCollectionRxjs = injectCollectionRxjs;
//# sourceMappingURL=injectCollectionRxjs.js.map