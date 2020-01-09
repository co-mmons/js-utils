export class ContainerEventsManager {
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
                    listener.listener(event);
                }
                catch (error) {
                    console.log(error);
                }
            }
        }
    }
}
//# sourceMappingURL=container-events-manager.js.map