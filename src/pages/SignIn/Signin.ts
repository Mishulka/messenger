import Block from '../../core/block';
import template from './Template';
import Button from '../../partials/button/index';
import Link from '../../partials/link/index';
import { loginPage } from '../Login/Login';

export interface IPageProps {
    register_button?: Button;
    buttonText?: string;
    link_login?: Link;
}

class SignIn extends Block {
  constructor(props: IPageProps) {
    super('div', props);
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