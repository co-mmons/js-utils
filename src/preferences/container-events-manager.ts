import {PreferencesItemEvent, PreferencesItemEventListener} from "./interfaces";

export class ContainerEventsManager {

    private listeners: {listener: PreferencesItemEventListener, collection?: string}[] = [];

    addListener(listener: PreferencesItemEventListener, collection: string) {
        this.listeners.push({listener, collection});

        return () => {
            for (let i = this.listeners.length - 1; i >= 0; i--) {
                if (this.listeners[i].listener === listener && ((!this.listeners[i].collection && !collection) || (this.listeners[i].collection === collection))) {
                    this.listeners.splice(i, 1);
                }
            }
        }
    }

    fireEvent(event: PreferencesItemEvent<any, any>) {

        for (const listener of this.listeners) {
            if (!listener.collection || event.collection === listener.collection) {
                try {
                    listener.listener(event);
                } catch (error) {
                    console.log(error);
                }
            }
        }

    }
}
