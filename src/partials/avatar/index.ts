import Block from '../../core/Block/block';
import { compile } from 'handlebars';
import { template } from './avatar';
import Store from '../../core/Store';
import UserController from '../../apiControllers/UserController/UserController';

export default class AvatarInput extends Block {
    constructor() {
        super('div', {
            events: {
                change: async (e: Event) => await this.handleChange(e),
            },
        });
    }

    async handleChange(e: Event) {
        const input = e.target as HTMLInputElement;
        const file = input.files?.[0];

        if (!file) return;

        try {
            const user = await UserController.UpdateAvatar(file);
            
            if (user) {
                Store.set('user', user);
                console.log('Аватар успешно обновлён, данные пользователя:', user);
                alert('Аватар успешно обновлён');
            }
        } catch (err) {
            console.error('Ошибка при обновлении аватара:', err);
            alert('Ошибка при обновлении аватара');
        } finally {
            input.value = '';
        }
    }

    render(): DocumentFragment {
        const htmlString = compile(template)(this.props);
        const temp = document.createElement('template');
        temp.innerHTML = htmlString;
        return temp.content;
    }
}
