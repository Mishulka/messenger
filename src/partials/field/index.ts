import { compile,} from 'handlebars';
import Block from '../../core/block';
import { template } from './Field';
import Validate from '../../utils/validate';

export default class Field extends Block {
    constructor(props: { 
        classname?: string; 
        label_name: string;
        name: string;
        placeholder: string;
        value: string;
        text: string, 
        type: string, 
        error?: string | null;
        errors?: string[];
        required?: string;
        events?: {
            focusout?: (event: FocusEvent) => void;
            focus?: (event: FocusEvent) => void;
        }
    }) {
        super("div", props);
        if (props.name === 'login') {
        (window as any).loginField = this;
        } else if (props.name === 'password') {
            (window as any).passwordField = this;
        }
    }

     focusoutHandler = (event: FocusEvent) => {
        const target = event.target as HTMLInputElement;

        let error = Validate(target.value, target.name) || null;
        if (!error) {
          error = '';
        }

        this.setProps({ error });
    }
    render(): DocumentFragment {
        const htmlString = compile(template)({
            ...this.props,
            focusoutHandler: this.focusoutHandler,
            error: this.props.error || '',
        });
        const temp = document.createElement('template');
        temp.innerHTML = htmlString;
        return temp.content;
    }

    _addEvents() {
    const inputEl = this.element?.querySelector('input');
    
    if (inputEl) {
        inputEl.addEventListener('input', (event: Event) => {
            const target = event.target as HTMLInputElement;
            const currentValue = target.value;
            let error = Validate(target.value, target.name);
            if (!error) {
              error = null;
            }
             if (this.props.value !== currentValue || this.props.error !== error) {
            const selectionStart = target.selectionStart;

            const isFocused = (document.activeElement === inputEl);
            this.setProps({ value: currentValue, error });
            if (isFocused) {
              setTimeout(() => {
                
                  const newInputEl = this.element?.querySelector('input');
                  newInputEl?.focus();

                   if (selectionStart !== null) {
                    newInputEl?.setSelectionRange(selectionStart, selectionStart);
                  }
              }, 0);
            }
    }
        });
      
        inputEl.addEventListener('focusout', (event: FocusEvent) => {
            if (this.props.events && this.props.events.focusout) {
                this.props.events.focusout(event);
            } else {
                this.focusoutHandler(event);
            }
        });
    }
}
}
