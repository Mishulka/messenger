import { Http } from "../../core/Http";


export class UserAPI {
    private readonly http: Http;

    constructor() {
        this.http = new Http('/auth');
    }

    updateProfile(data: Record<string, unknown>) {
        return this.http.put('/user/profile', data)
    }

    updateAvatar(formData: FormData) {
        return this.http.put('/user/profile/avatar', formData)
    }

    updatePassword(data: Record<string, unknown>) {
        return this.http.put('/user/password', data)
    }

    getUserById(id: number) {
        return this.http.get(`/user/${id}`)
    }

    searchUser(login: string) {
        return this.http.post('/user/search', { login })
    }
}

