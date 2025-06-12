import Block from '../../core/block';
import template from './Template';
import Button from '../../partials/button/index';
import Link from '../../partials/link/index';
import router from '../../core/Router';
import AuthController from '../../apiControllers/AuthController/AuthController';

export interface IPageProps {
    register_button?: Button;
    buttonText?: string;
    link_login?: Link;
    [key: string]: unknown;
}

class SignUp extends Block {
  constructor(props: IPageProps) {
    super('div', {
            ...props,
            events: {
                submit: (e: Event) => this.handleSubmit(e)
            }
    });
  }

  private async handleSubmit(e: Event) {
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
      first_name: formData.get('first_name')?.toString() || '',
      second_name: formData.get('second_name')?.toString() || '',
      login: formData.get('login')?.toString() || '',
      email: formData.get('email')?.toString() || '',
      password: formData.get('password')?.toString() || '',
      phone: formData.get('phone')?.toString() || '',
    };
    
    console.log('login Form data prepared: ', formData)
    await AuthController.signup(data);
  }

  render(): DocumentFragment  {
    return this.compile(template, this.props);
  }
}

export const signUpPage = new SignUp({
  register_button: new Button({
          text: 'Register',
          type: 'submit',
  }),
  link_login: new Link({
          text: 'Login',
          href: '/',
          data_page: 'Login',
          type: 'button',
          events: {
              click: (e: Event) => {
                  e.preventDefault();
                  router.go('/');
              }
          }
  })
});
