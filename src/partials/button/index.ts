import { compile,} from 'handlebars';
import Block from '../../block';
import { template } from './button';

export default class Button extends Block {
    constructor(props: { 
        classname?: string; 
        text: string, 
        type: string, 
        events?: Record<string, () => void> 
    }) {
        super("div", props)
    }
    render(): DocumentFragment {
        const { text } = this.props;
        const htmlString = compile(template)(this.props);
        const temp = document.createElement('template');
        temp.innerHTML = htmlString;
        return temp.content;
    }
}

