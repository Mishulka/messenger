import Block, { TProps } from '../../core/block';
import template from './Template';
import Button from '../../partials/button/index';
import { profilePage } from '../../pages/Profile/Profile';

interface IEditProfileProps {
  user: {
    userAvatar: string;
    email: string;
    first_name: string;
    login: string;
    second_name: string;
    display_name: string;
    phone: string;
  };
  button_save: Button;
}

class EditProfile extends Block {
  constructor(props: IEditProfileProps) {
    super('div', props as unknown as TProps);
  }

  render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export const editProfilePage = new EditProfile({
  user: {
    userAvatar: '',
    email: '',
    first_name: '',
    login: '',
    second_name: '',
    display_name: '',
    phone: ''
  },
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

export default editProfilePage;

