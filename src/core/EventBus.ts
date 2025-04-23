class EventBus {
    constructor() {
        this.listeners = {};
    }

    on(event, callback) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    }

    emit(event, ...args) {
        if (!this.listeners[event]) {
            throw new Error(`Event don't exist: ${event}`);
        }

        this.listeners[event].forEach(listener => {
            listener(...args);
        });
    }

    off(event, callback) {
        if (!this.listeners[event]) {
      throw new Error(`Event don't exist: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
      listener => listener !== callback
    );
    }
}

export default EventBus;
