class EventBus {
    listeners: Record<string, Array<(...args: unknown[]) => void>>;
    constructor() {
        this.listeners = {};
    } 

    on(event: string, callback: (...args: unknown[]) => void) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    }

    emit(event: string, ...args: unknown[]) {
        if (!this.listeners[event]) {
            // throw new Error(`Event don't exist: ${event}`);
            return;
        }

        this.listeners[event].forEach(listener => {
            listener(...args);
        });
    }

    off(event: string, callback: (...args: unknown[]) => void) {
        if (!this.listeners[event]) {
      throw new Error(`Event don't exist: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
      listener => listener !== callback
    );
    }
}

export default EventBus;
