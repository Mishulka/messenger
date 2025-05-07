import { compile,} from 'handlebars';
import Block from '../../block';
import { template } from './Field';

export default class Field extends Block {
    constructor(props: { 
        classname?: string; 
        label_name: string;
        name: string;
        placeholder: string;
        value: string;
        text: string, 
        type: string, 
        events?: Record<string, () => void> 
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