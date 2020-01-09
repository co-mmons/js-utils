import {Observable, Subscriber} from "rxjs";
import {map} from "rxjs/operators";
import {PreferencesCollectionRefImpl} from "../collection-impl";
import {deepClone} from "../deep-clone";
import {PreferencesCollectionRef, PreferencesItem, PreferencesItemEvent} from "../interfaces";

class CollectionItemsObserver<Key, Value> extends Observable<PreferencesItem<Key, Value>[]> {

    constructor(private readonly collection: PreferencesCollectionRef<Key, Value>) {
        super(subscriber => this.onSubscribe(subscriber));
    }

    private unlisten: () => void;

    private readonly subscribers: Subscriber<PreferencesItem<Key, Value>[]>[] = [];

    private onSubscribe(subscriber: Subscriber<PreferencesItem<Key, Value>[]>) {

        this.collection.items().then(items => {
            subscriber.next(deepClone(items));

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
        }
    }

    protected async listener(event: PreferencesItemEvent<Key, Value>) {

        const items = await this.collection.items();

        for (const subscriber of this.subscribers) {
            subscriber.next(deepClone(items));
        }
    }

}

declare module "../interfaces" {

    interface PreferencesCollectionRef<Key, Value> {
        observeItems(): Observable<PreferencesItem<Key, Value>[]>;
        observeValues(): Observable<Value[]>;
    }

}

declare module "../collection-impl" {

    interface PreferencesCollectionRefImpl<Key, Value> extends PreferencesCollectionRef<Key, Value> {
    }

}

export function injectCollectionRxjs() {

    PreferencesCollectionRefImpl.prototype.observeItems = function (this: PreferencesCollectionRefImpl<any, any>) {
        return new CollectionItemsObserver(this);
    };

    PreferencesCollectionRefImpl.prototype.observeValues = function (this: PreferencesCollectionRefImpl<any, any>) {
        return new CollectionItemsObserver(this).pipe(map(items => items.map(item => item.value)));
    };
}
