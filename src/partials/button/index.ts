import { compile,} from 'handlebars';
import Block from '../../core/block';
import { template } from './button';

export default class Button extends Block {
    constructor(props: { 
        classname?: string; 
        text: string, 
        type: string, 
        icon?: string,
        events?: Record<string, (e: Event) => void> 
    }) {
        super("div", props)
    }
    render(): DocumentFragment {
        const htmlString = compile(template)(this.props);
        const temp = document.createElement('template');
        temp.innerHTML = htmlString;
        return temp.content;
    }
}

