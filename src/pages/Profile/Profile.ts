
import Block from '../../core/block';
import template from './Template';
import Link from '../../partials/link/index';
import router from '../../core/Router';
import AuthController from '../../apiControllers/AuthController/AuthController';
import Store, { StoreEvents } from '../../core/Store';
import { User } from '../../core/types';
import Avatar from '../../partials/avatar';
//import UserController from '../../apiControllers/UserController/UserController';

export interface IPageProps {
    link_edit_profile?: Link;
    link_edit_password?: Link;
    link_logout?: Link;
    avatar?: Avatar;
    [key: string]: unknown;
}

class Profile extends Block {
  constructor(props: IPageProps) {
    super('div', {
        ...props,
        user: Store.getState().user || {}
    });

    AuthController.getUser()
    console.log('Store', Store.getState().user)

    Store.on(StoreEvents.Updated, () => {
        this.setProps({ user: Store.getState().user })
      });
  }

  render(): DocumentFragment {
    return this.compile(template, {
        ...this.props,
        user: {
            first_name: (this.props.user as User)?.first_name  || 'Не указано',
            second_name: (this.props.user as User)?.second_name  || 'Не указано',
            email: (this.props.user as User)?.email  || 'Не указано',
            phone: (this.props.user as User)?.phone  || 'Не указано',
            login: (this.props.user as User)?.login  || 'Не указано',
            display_name: (this.props.user as User)?.display_name  || '',
            avatarUrl: (this.props.user as User)?.avatar || '',
        }
    });
    
  }
}

export const profilePage = new Profile({
    avatar: new Avatar(),
    link_to_chats: new Link({
        text: 'вернуться к чатам',
        type: 'link',
        events: {
            click: (e: Event) => {
                e?.preventDefault();
                router.go('/messenger')
            }
        }
    }),
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
        href: '/',
        data_page: 'Login',
        type: 'button',
        events: {
            click: (e: Event) => {
                e.preventDefault();
                router.go('/');
                AuthController.logout();
            }
        }
  })
});
