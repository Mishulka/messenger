import './routes.ts';
import router from './core/Router.js';
import isAuthorized from './utils/isAuthorized.js';

document.addEventListener('DOMContentLoaded', async () => {
    const path = window.location.pathname;

    try {
        const isAuth = await isAuthorized();

        if (!isAuth && !['/login', '/signup'].includes(path)) {
            // Сохраняем, куда хотел попасть пользователь
            localStorage.setItem('redirectAfterLogin', path);
            router.go('/login');
            return;
        }

        if (isAuth && ['/login', '/signup', '/'].includes(path)) {
            // После логина возвращаем пользователя на сохранённую страницу
            const redirectPath = localStorage.getItem('redirectAfterLogin') || '/select-chat';
            localStorage.removeItem('redirectAfterLogin');
            if (path !== redirectPath) {
                router.go(redirectPath);
                return;
            }
        }

    } catch (e) {
        router.go('/login');
        return;
    }

    router.start(); // Стартуем Роутер только когда уже точно решили куда идти
});
