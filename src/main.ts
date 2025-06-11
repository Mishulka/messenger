//import App from './app.js'
import './routes.ts'
import router from './core/Router.js';
// import AuthController from 'apiControllers/AuthController/AuthController.js';
import isAuthorized from './utils/isAuthorized.js';


document.addEventListener('DOMContentLoaded', async () => {
    // const app = new App();
    // app.render();
    router.start();
    // if (await isAuthorized()) {
    //         router.go('/select-chat');
    //     } else {
    //         router.go('/login')
    //     }
})