import Block from '../../core/block';
import template from './Template';
import Button from '../../partials/button/index';
import Link from '../../partials/link/index';
import { signInPage } from '../SignIn/Signin';
import { selectChatPage } from '../SelectChat/SelectChat';
import { handleInputBlur } from '../../utils/handleInputBlur';

export interface IPageProps {
    login_button?: Button;
    field_login?: Block;
    field_password?: Block;
    buttonText?: string;
    link_register?: Link;
}

class LoginPage extends Block {
    constructor(props: IPageProps) {
        super('div', props);
        (window as any).handleInputBlur = handleInputBlur;
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
                    const container = document.getElementById('app');
                    if (container) {
                      container.innerHTML = '';
                      container.appendChild(selectChatPage.getContent() as HTMLElement);
                      selectChatPage.dispatchComponentDidMount();
                  }
                    return;
                }

            });
        }
    }
    
    render(): DocumentFragment {
            return this.compile(template, this.props);
    }
}

export const loginPage = new LoginPage({
    login_button: new Button({
        text: 'Login',
        type: 'submit',
        events: {
            click: () => {
                event?.preventDefault();
                const form = document.querySelector('form');
                if (form) {
                    form.dispatchEvent(new Event('submit', { cancelable: true }));
                }  
                
            }
        }
    }),
    link_register: new Link({
        text: 'Register',
        href: '/signin',
        data_page: 'Signin',
        type: 'button',
        events: {
            click: () => {
                //console.log('Register link clicked');
                const container = document.getElementById('app');
                if (container) {
                    container.innerHTML = '';
                    container.appendChild(signInPage.getContent() as HTMLElement);
                    signInPage.dispatchComponentDidMount();
                }
            }
        }
    })
});


