import set from "../utils/set";
import EventBus from "./EventBus";
import { User } from "./types";

export enum StoreEvents {
    Updated = "updated",
}

class Store extends EventBus {
    private state: {
        user?: User;
        [key: string]: unknown;
    } = {};

    public getState() {
        return this.state;
    }

    public set(path: string, value: unknown) {
        set(this.state, path, value);
        this.emit(StoreEvents.Updated);
    }

    public clearAll(): void {
        this.state = {};
        this.emit(StoreEvents.Updated);
    }
}

export default new Store();