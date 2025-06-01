import Block from '../../core/block';
import template from './Template';
import Button from '../../partials/button/index';
import Link from '../../partials/link/index';
import { handleInputBlur } from '../../utils/handleInputBlur';
import router from '../../core/Router';
import AuthController from '../../apiControllers/AuthController/AuthController';
import Store, { StoreEvents } from '../../core/Store';

export interface IPageProps {
    [key: string]: unknown;
    login_button?: Button;
    field_login?: Block;
    field_password?: Block;
    buttonText?: string;
    link_register?: Link;
    loginError?: string;
}

class LoginPage extends Block {
    constructor(props: IPageProps) {
        super('div', {
            ...props,
            events: {
                submit: (e: Event) => this.handleSubmit(e)
            }
        });
        // @ts-expect-error: Property 'handleInputBlur' 
        // does not exist on type 'Window & typeof globalThis'.
        (window).handleInputBlur = handleInputBlur;
        setTimeout(() => this.dispatchComponentDidMount(), 0);

        //Store.on(StoreEvents.Updated, this.handleStoreUpdate)
    }

    // private handleStoreUpdate = () => {
    //     const { auth } = Store.getState();
    // }

    // componentWillUnmount() {
    //     Store.off(StoreEvents.Updated, this.handleStoreUpdate);
    // }

    private async handleSubmit(e: Event): Promise<void> {
        e.preventDefault();
        const form = e.target as HTMLFormElement;

        let isValid = true;
        Array.from(form.elements).forEach((element) => {
            const input = element as HTMLInputElement;
            if (input.tagName !== 'INPUT') return;

            if (!input.value.trim()) {
                input.setAttribute('data-error', 'Поле не может быть пустым');
                isValid = false;
            }
        });

        if (!isValid) {
            this.setProps({ loginError: 'Заполните все поля' });
            return;
        }

        const formData = new FormData(form);
        const data = {
            login: formData.get('login')?.toString() || '',
            password: formData.get('password')?.toString() || ''
        };

        try {
            console.log('login Form data prepared: ', data)
            await AuthController.signin(data);
        } catch (error) {
            console.error('Login failed:', error);
            this.setProps({ loginError: 'Неверный логин или пароль' });
        }
    }
    
    render(): DocumentFragment {
            return this.compile(template, {
                ...this.props,
                loginError: this.props.loginError ? this.props.loginError : ''
            });
    }
}

export const loginPage = new LoginPage({
    login_button: new Button({
        text: 'Login',
        type: 'submit',
        events: {
            click: (e: Event) => {
                e?.preventDefault();
                const event = new Event('submit', { bubbles: true });
                if(event) {
                    const form = document.querySelector('form');
                    if (form) {
                        form.dispatchEvent(event);
                    }
                }
            }
        }
    }),
    link_register: new Link({
        text: 'Register',
        href: '/signup',
        data_page: 'Signin',
        type: 'button',
        events: {
            click: (e: Event) => {
                e?.preventDefault();
                router.go('/signup');
            }
        }
    })
});

