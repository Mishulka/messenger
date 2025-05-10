import Block from '../../core/block';
import template from './Template';
import Button from '../../partials/button/index';
import Field from '../../partials/field/index';
import Link from '../../partials/link/index';
import { loginPage } from '../Login/Login';

export interface IPageProps {
    register_button?: Button;
    field_login?: Block;
    field_password?: Block;
    buttonText?: string;
    link_login?: Link;
    field_email?: Block;
    field_name?: Block;
    field_surname?: Block;
    field_phone?: Block;
    field_password_repeat?: Block;
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
  field_email: new Field({
          label_name: 'Email',
          name: 'email',
          placeholder: 'Enter your email',
          value: '',
          text: 'Email',
          type: 'email',
          required: 'required',
  }),
  field_login: new Field({
          label_name: 'Login',
          name: 'login',
          placeholder: 'Enter your login',
          value: '',
          text: 'Login',
          type: 'text',
          required: 'required',
  }),
  field_name: new Field({
          label_name: 'Name',
          name: 'first_name',
          placeholder: 'Enter your name',
          value: '',
          text: 'Name',
          type: 'text',
          required: 'required',
  }),
  field_surname: new Field({
          label_name: 'Surname',
          name: 'second_name',
          placeholder: 'Enter your surname',
          value: '',
          text: 'Surname',
          type: 'text',
          required: '',
  }),
  field_phone: new Field({
          label_name: 'Phone',
          name: 'phone',
          placeholder: 'Enter your phone',
          value: '',
          text: 'Phone',
          type: 'tel',
          required: 'required',
  }),
  field_password: new Field({
          label_name: 'Password',
          name: 'password',
          placeholder: 'Enter your password',
          value: '',
          text: 'Password',
          type: 'password',
          required: 'required',
  }),
  field_password_repeat: new Field({
          label_name: 'Password repeat',
          name: 'password_repeat',
          placeholder: 'Repeat your password',
          value: '',
          text: 'Password repeat',
          type: 'password',
          required: 'required',
  }),
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