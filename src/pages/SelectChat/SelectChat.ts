import Block from '../../core/block';
import template from './Template';
import Button from '../../partials/button/index';
import Link from '../../partials/link/index';
import Input from '../../partials/input';

export interface ISelectChatProps {
    header?: string;
    create_chat_button?: Button;
    link_profile?: Link;
    field_message?: Block;
}

class SelectChatPage extends Block {
    constructor(props: ISelectChatProps) {
        super('div', props);
    }

    render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

export const selectChatPage = new SelectChatPage({
    link_profile: new Link({
        text: 'Profile',
        href: '/profile',
        data_page: 'Profile',
        type: 'button',
        events: {
            click: () => {
                console.log('Переход к профилю');
            }
        }
    }),
    field_message: new Input({
        label_name: 'Message',
        name: 'message',
        placeholder: 'Enter your message',
        value: '',
        text: 'Message',
        type: 'text',
        error: null,
        required: '',
        events: {}
    })
});
