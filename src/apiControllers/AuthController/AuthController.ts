import { AuthAPI } from "../../api/AuthAPI/auth-api";
import Store from "../../core/Store";
import router from "../../core/Router";
import type { SignupRequest, LoginRequest } from "../../api/AuthAPI/types";
import { User } from "core/types";

class AuthController {
    private api: AuthAPI;

    constructor() {
        this.api = new AuthAPI();
    }

    async signup(data: SignupRequest): Promise<void> {
        try {
            await this.api.signup(data);
            const user = await this.getUser();
            if (user) {
                Store.set('user', user);
                localStorage.setItem('user', JSON.stringify(user));
                router.go('/messenger');
            }
        } catch (error) {
            const errMessage = await this.handleError(error);
            Store.set('auth.error', errMessage);
        }
    }
    async signin(data: LoginRequest): Promise<void> {
        try {
            await this.api.signin(data);
            const user = await this.getUser();
            if (user) {
                Store.set('user', user);
                localStorage.setItem('user', JSON.stringify(user));
                router.go('/messenger');
            }
        } catch (error) {
            console.error('❌ caught error in signin:', error);
            Store.set('auth.error', await this.handleError(error));
        }
    }
    async logout() {
        try {
            await this.api.logout();
            Store.clearAll();
            localStorage.removeItem('user');
            router.go('/');
        } catch (error) {
            Store.set('auth.error', await this.handleError(error));
        }
    }
    async getUser(): Promise<User | undefined> {
        try {
            const user = await this.api.getUser();
            if (user) {
                Store.set('user', user);
                localStorage.setItem('user', JSON.stringify(user));
                return user;
            }
            return undefined;
        } catch (error) {
            const errMessage = await this.handleError(error);
            Store.set('auth.error', errMessage);
            return undefined;
        }
    }

    private async handleError(error: unknown): Promise<string> {
        if (error instanceof XMLHttpRequest) {
            try {
                const reason = JSON.parse(error.responseText)
                return reason || 'Unknown error';
            } catch {
                return `${error.status} ${error.statusText}`;
            }
        }
        return 'Unknown error';
    }
}

export default new AuthController();

