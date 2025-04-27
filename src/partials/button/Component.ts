import { compile,} from 'handlebars';
import Block from '../../block';

import { template } from './button';
export class Button extends Block {
    constructor(props: {}) {
        super("button", props)
    }
    render(): string {
        const { text } = this.props;
        return compile(template);
    }
}