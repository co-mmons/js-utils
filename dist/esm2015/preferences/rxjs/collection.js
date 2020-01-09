import { __awaiter } from "tslib";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { PreferencesCollectionRefImpl } from "../collection-impl";
import { deepClone } from "../deep-clone";
import { PreferencesItemImpl } from "../item-impl";
class CollectionItemsObserver extends Observable {
    constructor(collection) {
        super(subscriber => this.onSubscribe(subscriber));
        this.collection = collection;
        this.subscribers = [];
    }
    onSubscribe(subscriber) {
        this.collection.items().then(items => {
            subscriber.next(items);
            if (!this.unlisten) {
                this.collection.listen(event => this.listener(event));
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
        return __awaiter(this, void 0, void 0, function* () {
            const items = yield this.collection.items();
            for (const subscriber of this.subscribers) {
                subscriber.next(items.slice()
                    .map(item => (item && new PreferencesItemImpl(item.ref.collection, deepClone(item.key), deepClone(item.value))) || item));
            }
        });
    }
}
export function injectCollectionRxjs() {
    PreferencesCollectionRefImpl.prototype.observeItems = function () {
        return new CollectionItemsObserver(this);
    };
    PreferencesCollectionRefImpl.prototype.observeValues = function () {
        return new CollectionItemsObserver(this).pipe(map(items => items.map(item => item.value)));
    };
}
//# sourceMappingURL=collection.js.map