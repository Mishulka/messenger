import ChatsController from "../apiControllers/ChatsController/ChatsController";
import Store from "./Store";
import { User } from "./types";



export async function WSConnect() {
    const user = (Store.getState().user as User);
    const chatId: number  = (Store.getState().currentChatId as number);

    const token = await ChatsController.getToken(chatId);

    console.log('\n WSConnect called with user:', user, 'chatId:', chatId, 'token:', token + '\n');

    const socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${user.id}/${chatId}/${token}`);

    socket.addEventListener('open', () => {
        console.log('Соединение установлено');

        socket.send(JSON.stringify({
            content: 'Моё первое сообщение миру!',
            type: 'message',
        }));
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
    });

    socket.addEventListener('error', event => {
        console.log('Ошибка', event);
    });

    setInterval(() => {
        socket.send(JSON.stringify({}));
    }, 10000);
}