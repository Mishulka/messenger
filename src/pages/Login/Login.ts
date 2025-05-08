import Block from '../../block';
import template from './LoginTemplate';
import Button from '../../partials/button/index';
import Field from '../../partials/field/index';
import Link from '../../partials/link/index';

export interface ILoginPageProps {
    button: Button;
    field_login?: Block;
    field_password?: Block;
    buttonText?: string;
    link_register?: Link;
}

class LoginPage extends Block {
    constructor(props: ILoginPageProps) {
        super('div', props);
        
    };
    
    render(): DocumentFragment {
            return this.compile(template, this.props);
    }
}

export const loginPage = new LoginPage({
    button: new Button({
        text: 'Login',
        type: 'submit',
        events: {
            click: () => {
                
                const form = document.querySelector('form');

                if (form) {
                    form.dispatchEvent(new Event('submit'));
                    form.addEventListener('submit', (e) => {
                        e.preventDefault();
                        const form = e.target as HTMLFormElement;
                        const formData = new FormData(form);

                        const data: Record<string, string> = {};

                        formData.forEach((value, key) => {
                            data[key as string] = value.toString();
                        });
                        console.log('Form data: ', data);
                    });
                }
            }
        }
    }),
    field_login: new Field({
        label_name: 'Login',
        name: 'login',
        placeholder: 'Enter your login',
        value: '',
        text: 'Login',
        type: 'text',
        error: null,
        events: {
            focus: () => console.log('Login field focused')
        }
    }),
    field_password: new Field({
        label_name: 'Password',
        name: 'password',
        placeholder: 'Enter your password',
        value: '',
        text: 'Password',
        type: 'password',
    }),
    link_register: new Link({
        text: 'Register',
        type: 'link',
    })
});


