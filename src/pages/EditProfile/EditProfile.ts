import Block, { TProps } from '../../core/Block/block';
import template from './Template';
import Button from '../../partials/button/index';
import router from '../../core/Router/Router';
import AuthAPI from '../../api/AuthAPI/auth-api';
import UserController from '../../apiControllers/UserController/UserController';
import Validate from '../../utils/validate';
import Link from '../../partials/link/index';

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
  link_back: Link;
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
        const form = (e.target as HTMLElement).closest('form') as HTMLFormElement | undefined;
        if (!form) return;
        let isValid = true;
        const data: Record<string, string> = {};
        Array.from(form.elements).forEach((element) => {
          const input = element as HTMLInputElement;
          if (input.tagName !== 'INPUT') return;
          const rule = input.name;
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
        await UserController.updateProfile(data);
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

export default editProfilePage;

