//import App from './app.js'
import './routes.ts'
import router from './core/Router.js';


document.addEventListener('DOMContentLoaded', () => {
    // const app = new App();
    // app.render();
    router.start();
})
