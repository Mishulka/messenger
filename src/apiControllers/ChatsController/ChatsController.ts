import { ChatsAPI } from "../../api/ChatsAPI/chats-api";


class ChatsController {
    private api: ChatsAPI;

    constructor() {
        this.api = new ChatsAPI();
    }

    async getChats() {
        try {
            const chats = await this.api.getChats();
            return chats;
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

    async deleteChat(chatId: number) {
        try {
            await this.api.deleteChat(chatId);
            await this.getChats();
        } catch (err) {
            console.error('Error on deleting chats', err);
        }
    }

    async getToken(chatId: number) {
        try {
            const token = await this.api.getToken(chatId);
            return token;
        } catch (err) {
            console.error('Error on getting chat token', err);
        }
    }
}

export default new ChatsController();

