import Store from "../../core/Store";
import { ChatsAPI } from "../../api/ChatsAPI/chats-api";


class ChatsController {
    private api: ChatsAPI;

    constructor() {
        this.api = new ChatsAPI();
    }

    async getChats() {
        try {
            const res = await this.api.getChats();
            const data = JSON.parse(res.responseText);
            Store.set('chats', data);
        } catch (err) {
            console.error('Error on getting chats', err);
        }
    }

    async createChat(title: string) {
        try {
            await this.api.createChat(title);
            await this.getChats();
            console.log('creating chat: ', title)
        } catch (err) {
            console.error('Error on creating chat', err);
        }
    }

    async addUserToChat(userId: number, chatId: number) {
        try {
            await this.api.addUserToChat(chatId, [userId]);
            await this.getChats();
        } catch (err) {
            console.error('Error on adding user to chat', err);
        }
    }

    async removeUserFromChat(userId: number, chatId: number) {
        try {
            await this.api.removeUserFromChat(chatId, [userId]);
            await this.getChats();
        } catch (err) {
            console.error('Error on removing user from chat', err);
        }
    }

    async deleteChat(chatId: number) {
        try {
            await this.api.deleteChat(chatId);
            await this.getChats();
        } catch (err) {
            console.error('Error on deleting chats', err);
        }
    }

    async getToken(chatId: number): Promise<string | undefined> {
        try {
            const token = await this.api.getToken(chatId);
            Store.set('chatToken', token);
            return token;
        } catch (err) {
            console.error('Error on getting chat token', err);
        }
    }
}

export default new ChatsController();

