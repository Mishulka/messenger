
import Block from '../../core/block';
import template from './Template';
import Link from '../../partials/link/index';
import router from '../../core/Router';
import AuthController from '../../apiControllers/AuthController/AuthController';

export interface IPageProps {
    link_edit_profile?: Link;
    link_edit_password?: Link;
    link_logout?: Link;
    [key: string]: unknown;
}

class Profile extends Block {
  constructor(props: IPageProps) {
    super('div', props);
  }

  render(): DocumentFragment  {
    return this.compile(template, this.props);
  }
}

export const profilePage = new Profile({
    link_edit_profile: new Link({
        text: 'Edit profile',
        href: '/edit_profile',
        data_page: 'EditProfile',
        type: 'button',
        events: {
            click: (e: Event) => {
                e.preventDefault();
                router.go('/edit-profile');
            }
        }
    }),
    link_edit_password: new Link({
        text: 'Edit password',
        href: '/edit_password',
        data_page: 'EditPassword',
        type: 'button',
        events: {
            click: (e: Event) => {
                e.preventDefault();
                router.go('/edit-password');
            }
        }
    }),
    link_logout: new Link({
        text: 'Logout',
        href: '/login',
        data_page: 'Login',
        type: 'button',
        events: {
            click: (e: Event) => {
                e.preventDefault();
                AuthController.logout();
            }
        }
  })
});
