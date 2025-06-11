import { Http } from "../../core/Http";


export class ChatsAPI {
    private readonly http: Http;

    constructor() {
        this.http = new Http('/chats');
    }

    createChat(title: string) {
        return this.http.post('/',{ title });
    }

    getChats() {
        try {
            return this.http.get('/');
        } catch (err) {
            console.error('Error on getting chats', err);
            throw err;
        }
    }

    deleteChat(chatId: number) {
        return this.http.delete('/', { chatId });
    }

    addUserToChat(chatId: number, users: number[]) {
        return this.http.put('/users', {
            users,
            chatId
        })
    }

    removeUserFromChat(chatId: number, users: number[]) {
        return this.http.delete('/users', {
            users,
            chatId
        })
    }

    async getToken(chatId: number): Promise<string> {
        try {
            const data = await this.http.post<{token: string}>(`/token/${chatId}`);
            return data.token;
        } catch (err) {
            console.error('Error on getting chat token', err);
            throw err;
        }
        
    }
}