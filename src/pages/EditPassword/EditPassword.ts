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
        let data;
        console.log('updating', data)

        await UserController.updatePassword(data);
        router.go('/profile');
      }
    }
  })
});

export default editPasswordPage;
