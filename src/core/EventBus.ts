class EventBus {
    listeners: Record<string, Function[]>;
    constructor() {
        this.listeners = {};
    }

    on(event: string, callback: Function) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    }

    emit(event: string, ...args: unknown[]) {
        if (!this.listeners[event]) {
            throw new Error(`Event don't exist: ${event}`);
        }

        this.listeners[event].forEach(listener => {
            listener(...args);
        });
    }

    off(event: string, callback: Function) {
        if (!this.listeners[event]) {
      throw new Error(`Event don't exist: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
      listener => listener !== callback
    );
    }
}

export default EventBus;
