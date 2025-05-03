import Block from '../../block';
import { compile } from 'handlebars';

const BlockTemplate = `
    <div>
        <h1>{{ userName }}</h1>
        {{{ button }}}
    </div>
`;

export class BlockPage extends Block {
    constructor(props: { userName: string; button: Block }) {
        super('div', props);
    }

    render(): string {
        return this.compile(BlockTemplate, {
            userName: this.props.userName,
            button: this.children.button,
        });
    }
}