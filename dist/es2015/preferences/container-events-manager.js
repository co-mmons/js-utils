"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const deep_clone_1 = require("./deep-clone");
const item_ref_impl_1 = require("./item-ref-impl");
class ContainerEventsManager {
    constructor() {
        this.listeners = [];
    }
    addListener(listener, collection) {
        this.listeners.push({ listener, collection });
        return () => {
            for (let i = this.listeners.length - 1; i >= 0; i--) {
                if (this.listeners[i].listener === listener && ((!this.listeners[i].collection && !collection) || (this.listeners[i].collection === collection))) {
                    this.listeners.splice(i, 1);
                }
            }
        };
    }
    fireEvent(event) {
        for (const listener of this.listeners) {
            if (!listener.collection || event.collection === listener.collection) {
                try {
                    listener.listener({
                        ref: new item_ref_impl_1.PreferencesItemRefImpl(event.ref.collection, deep_clone_1.deepClone(event.ref.key)),
                        type: event.type,
                        collection: event.collection,
                        key: deep_clone_1.deepClone(event.key),
                        oldValue: deep_clone_1.deepClone(event.oldValue),
                        newValue: deep_clone_1.deepClone(event.newValue)
                    });
                }
                catch (error) {
                    console.log(error);
                }
            }
        }
    }
}
exports.ContainerEventsManager = ContainerEventsManager;
//# sourceMappingURL=container-events-manager.js.map