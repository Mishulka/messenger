import { Http } from '../../core/Http';
import type { 
    SignupRequest, 
    SignupResponse,
    LoginRequest,
    UserResponse
} from './types';

export class AuthAPI {
    private readonly http: Http;

    constructor() {
        this.http = new Http('/auth');
    }

    public async signup(data: SignupRequest): Promise<string> {
        const response = await this.http.post('/signup', data);
        return JSON.parse(response.responseText);
    }

    public async signin(data: LoginRequest): Promise<void> {
        await this.http.post('/signin', data);
    }

    public async logout(): Promise<void> {
        await this.http.post('/logout');
    }

    public async getUser(): Promise<UserResponse> {
        const response = await this.http.get('/user');
        return JSON.parse(response.responseText);
    }
}