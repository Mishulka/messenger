import { User } from 'core/types';
import { Http } from '../../core/Http/Http';
import type { 
    SignupRequest, 
    SignupResponse,
    LoginRequest
} from './types';

export class AuthAPI {
    private readonly http: Http;

    constructor() {
        this.http = new Http('/auth');
    }

    public async signup(data: SignupRequest): Promise<SignupResponse> {
        return this.http.post<SignupResponse>('/signup', data);
    }

    public async signin(data: LoginRequest): Promise<void> {
        const response = await this.http.post<{ reason?: string }>('/signin', {
            login: data.login,
            password: data.password
        });
        
        if (response?.reason) {
            throw new Error(response.reason);
        }
    }

    public async logout(): Promise<void> {
        await this.http.post('/logout');
    }

    public async getUser(): Promise<User> {
        const response = await this.http.get('/user');
        return JSON.parse(response.responseText);
    }
}

export default new AuthAPI();
