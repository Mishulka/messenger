import Block from '../../core/block';
import template from './Template';
import Button from '../../partials/button/index';
import Link from '../../partials/link/index';
import { profilePage } from '../../pages/Profile/Profile';

export interface ISelectChatProps {
    header?: string;
    create_chat_button?: Button;
    link_profile?: Link;
    send_button?: Button;
    [key: string]: unknown;
}

class SelectChatPage extends Block {
    constructor(props: ISelectChatProps) {
        super('div', props);
    }

    componentDidMount(): void {
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
    link_profile: new Link({
        text: 'Profile',
        href: '/profile',
        data_page: 'Profile',
        type: 'button',
        events: {
            click: () => {
                (event as Event).preventDefault();
                const container = document.getElementById('app');
                    if (container) {
                        container.innerHTML = '';
                        container.appendChild(profilePage.getContent() as HTMLElement);
                        profilePage.dispatchComponentDidMount();
                    }
            }
        }
    }),
    send_button: new Button({
        text: 'Отправить',
        type: 'button',
        classname: 'send_chat_button',
        events: {
            click: () => {
                const form = document.querySelector('form');
                if (form) {
                    form.dispatchEvent(new Event('submit', { cancelable: true }));
                }  
            }
        }
    }),
});
