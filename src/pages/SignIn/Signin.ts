import Block from '../../core/block';
import template from './Template';
import Button from '../../partials/button/index';
import Link from '../../partials/link/index';
import { loginPage } from '../Login/Login';

export interface IPageProps {
    register_button?: Button;
    buttonText?: string;
    link_login?: Link;
    [key: string]: unknown;
}

class SignIn extends Block {
  constructor(props: IPageProps) {
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
            const container = document.getElementById('app');
                  if (container) {
                      container.innerHTML = '';
                      container.appendChild(loginPage.getContent() as HTMLElement);
                      loginPage.dispatchComponentDidMount();
            }
            return;
            }
    
        });
        }
    }

  render(): DocumentFragment  {
    return this.compile(template, this.props);
  }
}

export const signInPage = new SignIn({
  register_button: new Button({
          text: 'Register',
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
  link_login: new Link({
          text: 'Login',
          href: '/login',
          data_page: 'Login',
          type: 'button',
          events: {
              click: () => {
                  //console.log('Register link clicked');
                  const container = document.getElementById('app');
                  if (container) {
                      container.innerHTML = '';
                      container.appendChild(loginPage.getContent() as HTMLElement);
                      loginPage.dispatchComponentDidMount();
                  }
              }
          }
  })
});