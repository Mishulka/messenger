import ChatsController from "../apiControllers/ChatsController/ChatsController";
import Store from "./Store";
import { User } from "./types";



export async function WSConnect(onMessages: (message: string[]) => void): Promise<WebSocket | null> {
    const user = (Store.getState().user as User);
    const chatId: number  = (Store.getState().currentChatId as number);

    const token = await ChatsController.getToken(chatId);

    console.log('\n WSConnect called with user:', user, 'chatId:', chatId, 'token:', token + '\n');
    return new Promise((resolve) => {
        const socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${user.id}/${chatId}/${token}`);

    socket.addEventListener('open', () => {
        console.log('Соединение установлено');

        socket.send(JSON.stringify({
            content: '0',
            type: 'get old',
        }));
        resolve(socket);
    });

    socket.addEventListener('close', event => {
        if (event.wasClean) {
            console.log('Соединение закрыто чисто');
        } else {
            console.log('Обрыв соединения');
        }

        console.log(`Код: ${event.code} | Причина: ${event.reason}`);
    });

    socket.addEventListener('message', event => {
        console.log('Получены данные', event.data);
         try {
            const data = JSON.parse(event.data);
            if (Array.isArray(data)) {
                onMessages(data.reverse());
            } else if (data.type === 'message') {
                onMessages(data);
            }
        } catch (err) {
            console.error('Ошибка парсинга сообщения:', err);
        }
    });

    socket.addEventListener('error', event => {
        console.log('Ошибка', event);
    });

    setInterval(() => {
        socket.send(JSON.stringify({ type: 'ping' }));
    }, 10000);
    })
    
}