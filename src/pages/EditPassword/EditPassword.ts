import Block from '../../core/block';
import template from './Template';
import Button from '../../partials/button/index';
import router from '../../core/Router';
import UserController from '../../apiControllers/UserController/UserController';

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

        const data: Record<string, string> = {}

        Array.from(form.elements).forEach((element) => {
            const input = element as HTMLInputElement;
            if (input.tagName !== 'INPUT') return;

            if (!input.value.trim()) {
                input.setAttribute('data-error', 'Поле не может быть пустым');
                isValid = false;
            }
            data[input.name] = input.value.trim();
        });

        if (!isValid) {
            alert('Ошибка')
            return;
        }

        try {
            await UserController.updatePassword(data);
            router.go('/profile')
        } catch (error) {
            console.error('Login failed:', error);
        }
        router.go('/profile');
      }
    }

  })
});

export default editPasswordPage;
