
import Block from '../../core/block';
import template from './Template';
import Link from '../../partials/link/index';
import router from '../../core/Router';
import AuthController from '../../apiControllers/AuthController/AuthController';
import Store, { StoreEvents } from '../../core/Store';
import { User } from '../../core/types';
import Button from '../../partials/button';
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

//   initAvatarListeners() {
//     const avatarOverlay = document.getElementById('avatar-overlay');
//     const avatarImg = document.getElementById('avatar-img');
//     const avatarInput = document.getElementById('avatar-input') as HTMLInputElement;

//     if (avatarOverlay && avatarImg && avatarInput) {
//         avatarImg.addEventListener('mouseenter', () => {
//             console.log('avatar enter')
//             avatarOverlay.style.display = 'flex';
//         });
//         avatarImg.addEventListener('mouseleave', () => {
//             avatarOverlay.style.display = 'none';
//         });
//     }
//   }

//   async handleAvatarChange() {
//     const input = document.getElementById('avatar-input') as HTMLInputElement;
//     if (input) {
//         if (!input.files?.length) return;
//         if (!input?.files?.length) {
//             console.warn('No file selected');
//             return;
//         }

//         if (input.files != null) {
//             const file = input.files[0];

//             try {
//                 await UserController.UpdateAvatar(file);
//                 await AuthController.getUser();
//             } catch (err) {
//                 console.error('Avatar upload failed', err)
//             }
//         }
//     }

//   }

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
    btn_edit_data: new Button({
        text: 'Изменить данные',
        type: 'link',
        events: {
            click: (e: Event) => {
                e?.preventDefault();
                router.go('/edit-profile')
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

// const root = document.getElementById('app');
// if (root) {
//     root.innerHTML = '';  
//     root.appendChild(avatar.getContent()); 
// }