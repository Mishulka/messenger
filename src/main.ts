import App from './app.js'
import './main_styles/style.pcss';
import EventBus from './core/EventBus.js'


const eventBus = new EventBus();


const callback = () => {
  console.count('Event emitted');
}

eventBus.on('myEvent', callback);
eventBus.on('myEvent', callback);
eventBus.on('myEvent', callback);

eventBus.emit('myEvent');

eventBus.off('myEvent', callback);

console.log(eventBus.listeners['myEvent']);



document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.render();
})
