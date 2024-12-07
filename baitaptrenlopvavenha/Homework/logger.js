export default class Logger {
    constructor() {
        this.events = {};
    }

    on(event, listener) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(listener);
    }

    emit(event, arg) {
        if (this.events[event]) {
            this.events[event].forEach(listener => listener(arg));
        }
    }

    log(message) {
        console.log(message);
    }
}