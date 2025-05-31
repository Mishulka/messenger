import Block from '../../core/block';
import template from './Template';
import Button from '../../partials/button/index';
import Link from '../../partials/link/index';
import { handleInputBlur } from '../../utils/handleInputBlur';
import router from '../../core/Router';
// import connect from '../../core/Connect';
// import UserLoginController from '../../apiControllers/UserLoginController';
import AuthController from '../../apiControllers/AuthController/AuthController';
import Store, { StoreEvents } from '../../core/Store';
// import { LoginRequest } from 'api/AuthAPI/types';

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


        //submitting on updated Store
        Store.on(StoreEvents.Updated, this.handleStoreUpdate)
    }

    private handleStoreUpdate = () => {
        const { auth } = Store.getState();
    }

    componentWillUnmount() {
        Store.off(StoreEvents.Updated, this.handleStoreUpdate);
    }

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

    // async componentDidMount(): Promise<void> {
    //     const form = document.querySelector('form');

    //     if (form) {
    //         form.addEventListener('submit', (e) => {
    //             // await UserLoginController.login(data);
    //             const form = e.target as HTMLFormElement;
                
    //             let hasEmptyFields = false;
    //             let hasValidationErrors = false;
                
    //             Array.from(form.elements).forEach((element) => {
    //                 const input = element as HTMLInputElement;
    //                 if (input.tagName !== 'INPUT') return;

    //                 if (!input.value.trim()) {
    //                 hasEmptyFields = true;
    //                 input.setAttribute('data-error', 'Поле не может быть пустым');
    //                 // this.showError(input);
    //                 }
                    

    //                 const errorValue = input.getAttribute('data-error');
    //                 if (errorValue && errorValue !== '') {
    //                 hasValidationErrors = true;
    //                 }
    //             });

    //             if (hasEmptyFields || hasValidationErrors) {
    //                 console.log('Error in validation – form not submitted');
    //                 return;
    //             }

    //             const formData = new FormData(form);

    //             const data: Record<string, string> = {};

    //             formData.forEach((value, key) => {
    //                 data[key as string] = value.toString();
    //             });

    //             const hasError = Array.from(form.elements).some((element) => {
    //                 const input = element as HTMLInputElement;
    //                 const errorValue = input.getAttribute('data-error');
    //                 return errorValue && errorValue !== '';
    //             });

    //             if (!hasError) {
    //                 console.log('Form data: ', data);
    //                 router.go('/select-chat');
    //                 return;
    //             }
    //             if (hasError) {
    //                 console.log('Ошибка валидации – форма не отправляется');
    //                 return;
    //             }

    //         });
    //     }
    // }
    
    render(): DocumentFragment {
            return this.compile(template, {
                ...this.props,
                loginError: this.props.loginError ? this.props.loginError : ''
            });
    }
}

// const withUser = connect((state) => ({
// loginError: state.login?.error
// }));

// const ConnectedLoginPage = withUser(LoginPage)

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
        href: '/signin',
        data_page: 'Signin',
        type: 'button',
        events: {
            click: (e: Event) => {
                e?.preventDefault();
                router.go('/signin');
            }
        }
    })
});

