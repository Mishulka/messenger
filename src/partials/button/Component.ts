import { compile,} from 'handlebars';
import Block from '../../block';
import { template } from './button';

export class ButtonBlock extends Block {
    constructor(props: { classname?: string; text: string }) {
        super("button", props)
    }
    render(): string {
        const { text } = this.props;
        //return `<button class="">${text}</button>`;
        return compile(template)(this.props);
    }
}

