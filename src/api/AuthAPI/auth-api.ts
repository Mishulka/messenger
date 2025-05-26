import { Http } from '../../core/Http';
import { SignupRequest, SignupResponse } from './types';


export class AuthAPI {
    private http = new Http(`auth`);
    public request(data: SignupRequest): Promise<SignupResponse> {
        return this.http.post<SignupResponse>('/signup', data);
    }
}
