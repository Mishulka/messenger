import { UserAPI } from "../../api/UserAPI/user-api";

class UserController {
    private api: UserAPI;

    constructor() {
        this.api = new UserAPI();
    }

    async updateProfile(data: Record<string, unknown>) {
        try {
            await this.api.updateProfile(data);
        } catch (err) {
            console.error('Error while updating profile', err);
        }
    }

    async UpdateAvatar(file: File) {
        const formData = new FormData();
        formData.append('avatar', file)

        try {
            const res = await this.api.updateAvatar(formData);
            return res;
        } catch (err) {
            console.error('Error while upload avatar', err)
        }
    }

    async updatePassword(data: Record<string, unknown>) {
        try {
            return await this.api.updatePassword(data)
        } catch (err) {
            console.error('Error on switching password', err)
        }
    }
}

export default new UserController();
