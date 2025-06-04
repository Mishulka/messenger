import Block, { TProps } from '../../core/block';
import template from './Template';
import Button from '../../partials/button/index';
import router from '../../core/Router';
import AuthAPI from '../../api/AuthAPI/auth-api';
import UserController from '../../apiControllers/UserController/UserController';

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

  async componentDidMount() {
      try {
        const user = await AuthAPI.getUser();
        this.setProps({
          userAvatar: user.avatar,
          email: user.email,
          first_name: user.first_name,
          login: user.login,
          second_name: user.second_name,
          display_name: user.display_name,
          phone: user.phone
        })
        console.log('user data fetched')
      } catch(err) {
        console.error('failed to get user', err);
      }
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
      click: async (e: Event) => {
        e.preventDefault();

        const form = (e.target as HTMLElement).closest('form') as HTMLFormElement | undefined
        const formData = new FormData(form)
        const data: Record<string, string> = {};
        formData.forEach((value, key) => {
          data[key] = value.toString();
        });
        console.log('updating', formData)

        await UserController.updateProfile(data)
        router.go('/profile');
      }
    }
  })
});

export default editProfilePage;

