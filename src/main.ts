import AuthController from './apiControllers/AuthController/AuthController';
import router from './core/Router/Router';
import './routes.ts';

document.addEventListener('DOMContentLoaded', async () => {
    const user = await AuthController.getUser();
    if (user) {
        if (window.location.pathname === '/' || window.location.pathname === '/login') {
            router.go('/messenger');
        }
    } else {
        if (window.location.pathname !== '/' && window.location.pathname !== '/signup') {
            router.go('/');
        }
    }
    router.start();
});
