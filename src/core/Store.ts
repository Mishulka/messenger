import set from "../utils/set";
import EventBus from "./EventBus";
import Indexed from "./types";

export enum StoreEvents {
    Updated = "updated",
}

class Store extends EventBus {
    private state: Indexed = {};

    public getState() {
        return this.state;
    }

    public set(path: string, value: string) {
        set(this.state, path, value);
        this.emit(StoreEvents.Updated);
    }

    public clearAll(): void {
        this.state = {};
        this.emit(StoreEvents.Updated);
    }
}

export default new Store();