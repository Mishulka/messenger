import Block from '../../core/block';
import template from './Template';
import Button from '../../partials/button/index';
import { profilePage } from '../../pages/Profile/Profile';

interface IEditPasswordProps {
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
      click: () => {
        (event as Event).preventDefault();
            const container = document.getElementById('app');
            if (container) {
                container.innerHTML = '';
                container.appendChild(profilePage.getContent() as HTMLElement);
                profilePage.dispatchComponentDidMount();
            }
      }
    }
  })
});

export default editPasswordPage;
