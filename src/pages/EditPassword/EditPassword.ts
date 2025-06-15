import Block from '../../core/Block/block';
import template from './Template';
import Button from '../../partials/button/index';
import router from '../../core/Router/Router';
import UserController from '../../apiControllers/UserController/UserController';
import Validate from '../../utils/validate';
import Link from '../../partials/link/index';

interface IEditPasswordProps {
  [key: string]: unknown;
  oldPasswordValue: string;
  newPasswordValue: string;
  repeatPasswordValue: string;
  oldPasswordError?: string;
  newPasswordError?: string;
  repeatPasswordError?: string;
  button_save: Button;
}

class EditPassword extends Block {
  constructor(props: IEditPasswordProps) {
    super('div', props);
  }

  render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export const editPasswordPage = new EditPassword({
  oldPasswordValue: '',
  newPasswordValue: '',
  repeatPasswordValue: '',
  button_save: new Button({
    text: 'Сохранить',
    type: 'submit',
    events: {
      click: async (e: Event) => {
        e.preventDefault();
        const button = e.target as HTMLButtonElement;
        const form = button.closest('form') as HTMLFormElement;
        let isValid = true;
        const data: Record<string, string> = {};
        Array.from(form.elements).forEach((element) => {
          const input = element as HTMLInputElement;
          if (input.tagName !== 'INPUT') return;
          const rule = input.name === 'repeat_password' ? 'new_password' : input.name;
          const error = Validate(input.value, rule);
          if (error) {
            input.setAttribute('data-error', error);
            isValid = false;
          } else {
            input.removeAttribute('data-error');
          }
          data[input.name] = input.value.trim();
        });
        if (!isValid) {
          alert('Проверьте правильность заполнения полей!');
          return;
        }
        await UserController.updatePassword(data);
        router.go('/settings');
      }
    }
  }),
  link_back: new Link({
    text: 'Назад',
    href: '/settings',
    type: 'button',
    events: {
      click: (e: Event) => {
        e.preventDefault();
        router.go('/settings');
      }
    }
  })
});

export default editPasswordPage;
