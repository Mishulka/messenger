
import Block from '../../core/block';
import template from './Template';
import Link from '../../partials/link/index';
import { loginPage } from '../../pages/Login/Login';
import editProfilePage from '../../pages/EditProfile/EditProfile';
import editPasswordPage from '../../pages/EditPassword/EditPassword';

export interface IPageProps {
    link_edit_profile?: Link;
    link_edit_password?: Link;
    link_logout?: Link;
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
            click: () => {
                (event as Event).preventDefault();
                const container = document.getElementById('app');
                    if (container) {
                        container.innerHTML = '';
                        container.appendChild(editProfilePage.getContent() as HTMLElement);
                        editProfilePage.dispatchComponentDidMount();
                    }
            }
        }
    }),
    link_edit_password: new Link({
        text: 'Edit password',
        href: '/edit_password',
        data_page: 'EditPassword',
        type: 'button',
        events: {
            click: () => {
                (event as Event).preventDefault();
                const container = document.getElementById('app');
                    if (container) {
                        container.innerHTML = '';
                        container.appendChild(editPasswordPage.getContent() as HTMLElement);
                        editPasswordPage.dispatchComponentDidMount();
                    }
            }
        }
    }),
    link_logout: new Link({
        text: 'Logout',
        href: '/login',
        data_page: 'Login',
        type: 'button',
        events: {
            click: () => {
                (event as Event).preventDefault();
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