import Block from '../../core/block';
import template from './Template';
import Button from '../../partials/button/index';
import Link from '../../partials/link/index';
import router from '../../core/Router';
import ChatsController from '../../apiControllers/ChatsController/ChatsController';
import Store, { StoreEvents } from '../../core/Store';
import { WSConnect } from '../../core/WebSocket';

export interface ISelectChatProps {
    header?: string;
    create_chat_button?: Button;
    link_profile?: Link;
    send_button?: Button;
    messages?: string[];
    messageInput?: string;
    [key: string]: unknown;
}

export const chats: Array<Chat> = [];

export interface Chat {
    id: number;
    title: string;
    avatar?: string;
    unread_count?: number;
    last_message?: {
        content: string;
        time: string;
    };
}

class SelectChatPage extends Block {
    private socket: WebSocket | null = null;
    private messages: string[] = [];
    

    constructor(props: ISelectChatProps) {
        super('div', {
            ...props,
            user: Store.getState().user,
            events: {
                submit: (e: Event) => this.handleSendMessage(e)
            }
        });
        console.log('user from Store:', Store.getState().user);
        this.setProps({ user: Store.getState().user });

        Store.on(StoreEvents.Updated, () => {
            const chatsRaw = Store.getState().chats;
            const chats: Array<Chat> = Array.isArray(chatsRaw) ? chatsRaw : [];
            this.setProps({ 
                chats,
                user: Store.getState().user
             });
        });
    }

    handleCreateChat() {
        ChatsController.createChat('new chat');
    }

    addUserToChat(userId: number, chatId: number) {
        if (!userId || !chatId) {
            console.error('User ID and Chat ID are required to add a user to a chat');
            return;
        }
        ChatsController.addUserToChat(userId, chatId);
    }
     
    handleSendMessage(e: Event): void {
        e.preventDefault();
        console.log(this.socket?.readyState === 1 ? 'WebSocket is open' : 'WebSocket is not open');
        console.log('Отправка сообщения');
        const form = e.target as HTMLFormElement;
        const input = form.querySelector('.message_input') as HTMLInputElement;
        console.log('Input value:', input.value);
        const messageText = input.value.trim();
        if (messageText && this.socket && this.socket.readyState === 1) {
            console.log('Отправка сообщения:', messageText);
            console.log(this.socket?.readyState === 1 ? 'WebSocket is open' : 'WebSocket is not open');
            this.socket.send(JSON.stringify({
                content: messageText,
                type: 'message',
            }));
            input.value = '';
        }
        console.log('handleSendMessage, this.socket:', this.socket);
        if (!this.socket || this.socket.readyState !== 1) {
            alert('Соединение с чатом ещё не установлено. Попробуйте через секунду.');
            return;
        }
    }

    async componentDidMount(): Promise<void> {
        
        ChatsController.getChats().then((chats) => {
            console.log('Chats from server:', chats);
            console.log('Chats in store:', Store.getState().chats);
        });   
        
        document.addEventListener('click', async (e) => {
        const target = e.target as HTMLElement;
        if (target.classList.contains('add_user_button')) {
            const currentChatId = Store.getState().currentChatId;
            if (!currentChatId) {
                alert('Сначала выберите чат!');
                return;
            }
            const userId = prompt('Введите ID пользователя для добавления:');
            if (userId) {
                ChatsController.addUserToChat(Number(userId), Number(currentChatId));
            }
        }

        const chatCard = target.closest('.card[data-chat-id]');
        if (chatCard) {
            const chatId = chatCard.getAttribute('data-chat-id');
            console.log("ВЫБРАН чат с ID:", chatId);
            if (chatId) {
                chatCard.getAttribute('data-chat-id');
                Store.set('currentChatId', Number(chatId));
                try {
                    console.log('Очистка старого чата')
                    this.messages = [];
                    this.setProps({ messages: [] });
                    if (this.socket) {
                        this.socket.close();
                        this.socket = null;
                    }

                } finally {
                const token = await ChatsController.getToken(Number(chatId));
                Store.set('token', token)
                console.log('Подключаюсь к чату:', chatId);
                this.socket = await WSConnect((messages) => {
                    console.log('Сокет инициализирован:', this.socket);
                    if (Array.isArray(messages)) {
                        this.messages = messages;
                    } else {
                        this.messages = [...(this.messages || []), messages];
                    }
                    this.setProps({ messages: this.messages });
                    this.setProps({ messages: this.messages });

                    this.setProps({ messages: this.messages });
                    setTimeout(() => {
                        const chatDiv = document.querySelector('.chat-messages');
                        if (chatDiv) {
                            chatDiv.scrollTop = chatDiv.scrollHeight;
                        }
                    }, 0); 
                });
                console.log('Текущий сокет:', this.socket);
                }  
            }
        }});
    }

    render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

export const selectChatPage = new SelectChatPage({
    chats,
    create_chat_button: new Button({
    text: 'new chat',
    type: 'button',
    classname: 'create_chat_button',
    events: {
        click: () => {
            const title = prompt('Введите название чата:');
            if (title) {
                ChatsController.createChat(title);
            }
        }
    }
    }),
    link_profile: new Link({
        text: 'Profile',
        href: '/profile',
        data_page: 'Profile',
        type: 'button',
        events: {
            click: (e: Event) => {
                e.preventDefault();
                router.go('/profile');
            }
        }
    }),
    btn_add_user: new Button({
        text: 'Add user',
        type: 'button',
        classname: 'add_user_button',
        events: {
            click: (e) => {
                e.preventDefault();
                const target = e.target as HTMLElement;
                if (target.classList.contains('add_user_button')) {
                    if (this as unknown as Block) {
                        const currentChatId = (this as unknown as Block).props.currentChatId ||
                        Store.getState().currentChatId;
                        console.log('Current chat ID:', currentChatId);
                        if (!currentChatId) {
                            alert('Сначала выберите чат!');
                            return;
                        }
                        const userId = prompt('Введите ID пользователя для добавления:');
                        if (userId) {
                            ChatsController.addUserToChat(Number(userId), Number(currentChatId));
                        }
                    }
                }
            }
        }
    }),
    btn_remove_user: new Button({
    text: 'Remove user',
    type: 'button',
    classname: 'remove_user_button',
    events: {
        click: () => {
            const currentChatId = Store.getState().currentChatId;
            if (!currentChatId) {
                alert('Сначала выберите чат!');
                return;
            }
            const userId = prompt('Введите ID пользователя для удаления:');
            if (userId) {
                ChatsController.removeUserFromChat(Number(userId), Number(currentChatId));
            }
        }
    }
    }),
    send_button: new Button({
        text: '',
        type: 'submit',
        classname: 'send_chat_button one-icon',
        icon: '../../assets/icons/send.svg',
        events: {
            click: async (e) => {
                e.preventDefault();
                const form = (e.target as HTMLElement).closest('form') as HTMLFormElement | null;
                if (form) {
                    selectChatPage.handleSendMessage({ 
                        preventDefault: () => {}, 
                        target: form 
                    } as unknown as Event);
                }
            }
        }
    }),
});
