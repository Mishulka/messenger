import Block from '../../block';
import template from './LoginTemplate';
import Button from '../../partials/button/index';

export interface ILoginPageProps {
    button: Button;
    buttonText?: string;
  }

class LoginPage extends Block {
    constructor(props: ILoginPageProps) {
        super('div', props);
        
    };
    
    render(): DocumentFragment {
            return this.compile(template, this.props);
    }
}

export const loginPage = new LoginPage({
    button: new Button({
        text: 'Login',
        type: 'submit',
        events: {
            click: () => console.log('Login button clicked')
        }
    })
});

setTimeout(() => {
    (loginPage.children.button as Block).setProps({ text: 'Заходите' });
}, 2000); 

