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
    constructor(props: ISelectChatProps) {
        super('div', {
            ...props
        });

        Store.on(StoreEvents.Updated, () => {
            console.log('Store updated, fetching chats from state');
            const chatsRaw = Store.getState().chats;
            const chats: Array<Chat> = Array.isArray(chatsRaw) ? chatsRaw : [];
            this.setProps({ chats });
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
            if (chatId) {
                const chatId = Store.getState().currentChatId ||
                chatCard.getAttribute('data-chat-id');

                const token = ChatsController.getToken(Number(chatId));
                Store.set('token', token)
                Store.set('currentChatId', Number(chatId));
                await WSConnect();
            }
        }});


        const form = document.querySelector('form');

        if (form) {
            form.addEventListener('submit', (e) => {
                console.log('Отправка формы');
                const form = e.target as HTMLFormElement;
                const formData = new FormData(form);

                const data: Record<string, string> = {};

                formData.forEach((value, key) => {
                    data[key as string] = value.toString();
                });

                const hasError = Array.from(form.elements).some((element) => {
                    const input = element as HTMLInputElement;
                    const errorValue = input.getAttribute('data-error');
                    return errorValue && errorValue !== '';
                });

                if (!hasError) {
                    console.log('Form data: ', data);
                    
                    return;
                }
                if (hasError) {
                    console.log('Ошибка валидации – форма не отправляется');
                    return;
                }

            });
        }
    }

    render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

export const selectChatPage = new SelectChatPage({
    chats,
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
    send_button: new Button({
        text: '',
        type: 'submit',
        classname: 'send_chat_button one-icon',
        icon: '../../assets/icons/send.svg',
        events: {
            click: async (e) => {
                e.preventDefault();
                
                await ChatsController.createChat('new chat')
            }
        }
    }),
});
