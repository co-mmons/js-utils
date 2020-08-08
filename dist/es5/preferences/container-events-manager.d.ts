import { PreferencesItemEvent, PreferencesItemEventListener } from "./interfaces";
export declare class ContainerEventsManager {
    private listeners;
    addListener(listener: PreferencesItemEventListener, collection: string): () => void;
    fireEvent(event: PreferencesItemEvent<any, any>): void;
}
