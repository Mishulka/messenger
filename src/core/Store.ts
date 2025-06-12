import set from "../utils/set";
import EventBus from "./EventBus";
import { User } from "./types";

export enum StoreEvents {
    Updated = "updated",
}

class Store extends EventBus {
    private state: {
        user?: User | null;
        auth: {
            error: string | null;
        }
        [key: string]: unknown;
    } = {
        user: null,
        auth: {
            error: null
        }
    };

    public getState() {
        return this.state;
    }

    public set(path: string, value: unknown) {
        set(this.state, path, value);
        this.emit(StoreEvents.Updated);

        console.log('Store updated: ', {
            path,
            value,
            newState: this.state
        })
    }

    public clearAll(): void {
        this.state = {
            user: null,
            auth: {
                error: null
            }
        };
        this.emit(StoreEvents.Updated);
    }
}

export default new Store();
