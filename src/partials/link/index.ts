import { compile,} from 'handlebars';
import Block from '../../block';
import { template } from './link';

export default class Link extends Block {
    constructor(props: { 
        classname?: string; 
        text: string, 
        href?: string,
        data_page?: string,
        type?: string, 
        Event?: string,
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