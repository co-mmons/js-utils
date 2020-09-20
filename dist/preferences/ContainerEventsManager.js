"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContainerEventsManager = void 0;
const deepClone_1 = require("./deepClone");
const PreferencesItemRefImpl_1 = require("./PreferencesItemRefImpl");
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
                        ref: new PreferencesItemRefImpl_1.PreferencesItemRefImpl(event.ref.collection, deepClone_1.deepClone(event.ref.key)),
                        type: event.type,
                        collection: event.collection,
                        key: deepClone_1.deepClone(event.key),
                        oldValue: deepClone_1.deepClone(event.oldValue),
                        newValue: deepClone_1.deepClone(event.newValue)
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
//# sourceMappingURL=ContainerEventsManager.js.map