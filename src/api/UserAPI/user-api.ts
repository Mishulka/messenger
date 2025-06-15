import { Http } from '../../core/Http/Http';

export class UserAPI {
    private readonly http: Http;

    constructor() {
        this.http = new Http('/user');
    }

    updateProfile(data: Record<string, unknown>) {
        return this.http.put('/profile', data)
    }

    updateAvatar(formData: FormData) {
        return this.http.put('/profile/avatar', formData)
    }

    updatePassword(data: Record<string, unknown>) {
        return this.http.put('/password', data)
    }

    getUserById(id: number) {
        return this.http.get(`/${id}`)
    }

    searchUser(login: string) {
        return this.http.post('/search', { login })
    }
}

