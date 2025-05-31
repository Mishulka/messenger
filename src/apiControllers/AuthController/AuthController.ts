import { AuthAPI } from "../../api/AuthAPI/auth-api";
import Store from "../../core/Store";
import router from "../../core/Router";
import type { SignupRequest, LoginRequest } from "../../api/AuthAPI/types";

class AuthController {
    private api: AuthAPI;

    constructor() {
        this.api = new AuthAPI();
    }

    async signup(data: SignupRequest): Promise<void> {
        try {
            const user = await this.api.signup(data);
            await this.getUser();
            Store.set('user', user);
            router.go('/select-chat');
        } catch (error) {
            const errMessage = await this.handleError(error);
            Store.set('auth.error', errMessage);
        }
    }
    async signin(data: LoginRequest): Promise<void> {
        try {
            await this.api.signin(data);
            const user = await this.getUser();
            Store.set('user', user);
        }catch (error) {
            Store.set('auth.error', await this.handleError(error));
        }
        router.go('/select-chat');
        
    }
    async logout() {
        try {
            await this.api.logout();
            Store.clearAll();
            router.go('/');
        } catch (error) {
            Store.set('auth.error', await this.handleError(error));
        }
    }
    async getUser(): Promise<void> {
        try {
            const user = await this.api.getUser();
            Store.set('user', user as unknown as string);
        } catch (error) {
            const errMessage = await this.handleError(error);
            Store.set('auth.error', errMessage);
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

