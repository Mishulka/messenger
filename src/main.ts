//import App from './app.js'
import './routes.ts'
import router from './core/Router.js';
// import AuthController from 'apiControllers/AuthController/AuthController.js';
import isAuthorized from './utils/isAuthorized.js';


document.addEventListener('DOMContentLoaded', async () => {
    // const app = new App();
    // app.render();
    router.start();
    if (await isAuthorized()) {
            router.go('/select-chat');
        } else {
            router.go('/login')
        }
})


// [vite] connecting...
// isAuthorized.ts:5 null
// AuthController.ts:48 getUser
// client:912 [vite] connected.
// Попадаю на страницу /select-chat но куки нет

// import AuthController from '../apiControllers/AuthController/AuthController.js';

// export default async function isAuthorized(): Promise<boolean> {
//     const user = localStorage.getItem("user");
//     console.log(user);

//     if (user) {
//         try {
//             await AuthController.getUser();
//             return true;
//         } catch (error) {
//             console.error("Ошибка при проверке авторизации:", error);
//             return false;
//         }
//     } else {
//         return false;
//     }
// }

// //import App from './app.js'
// import './routes.ts'
// import router from './core/Router.js';
// // import AuthController from 'apiControllers/AuthController/AuthController.js';
// import isAuthorized from './utils/isAuthorized.js';


// document.addEventListener('DOMContentLoaded', () => {
//     // const app = new App();
//     // app.render();
//     router.start();
//     if(isAuthorized()) {
//         router.go('/select-chat');
//     } else {
//         router.go('/login')
//     }
// })