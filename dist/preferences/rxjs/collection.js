"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const collection_impl_1 = require("../collection-impl");
const deep_clone_1 = require("../deep-clone");
const item_impl_1 = require("../item-impl");
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
                    .map(item => (item && new item_impl_1.PreferencesItemImpl(item.ref.collection, deep_clone_1.deepClone(item.key), deep_clone_1.deepClone(item.value))) || item));
            }
        });
    }
}
function injectCollectionRxjs() {
    collection_impl_1.PreferencesCollectionRefImpl.prototype.observeItems = function () {
        return new CollectionItemsObserver(this);
    };
    collection_impl_1.PreferencesCollectionRefImpl.prototype.observeValues = function () {
        return new CollectionItemsObserver(this).pipe(operators_1.map(items => items.map(item => item.value)));
    };
}
exports.injectCollectionRxjs = injectCollectionRxjs;
//# sourceMappingURL=collection.js.map