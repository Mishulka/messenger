import AuthController from '../apiControllers/AuthController/AuthController.js';

export default async function isAuthorized(): Promise<boolean> {
    const user = localStorage.getItem("user");
    console.log(user);

    if (user) {
        try {
            await AuthController.getUser()
            console.log('user is in storage')

            const auth = document.cookie.includes('authCookie')
            if(auth)
                console.log('Auth included: ', auth)
            return true;
        } catch (error) {
            console.error("Ошибка при проверке авторизации:", error);
            return false;
        }
    } else {
        return false;
    }
}