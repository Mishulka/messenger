import { compile,} from 'handlebars';
import Block from '../../core/Block/block';
import { template } from './goback';

export default class GoBack extends Block {
    constructor() {
        super("div")
    }
    render(): DocumentFragment {
        const htmlString = compile(template)(this.props);
        const temp = document.createElement('template');
        temp.innerHTML = htmlString;
        return temp.content;
    }
}

