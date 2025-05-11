import Block from '../../core/block';
import template from './Template';
import Button from '../../partials/button/index';

interface IServerErrorProps {
  backButton: Button;
}

class ServerError extends Block {
  constructor(props: IServerErrorProps) {
    super('div', props);
  }

  render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export const serverErrorPage = new ServerError({
  backButton: new Button({
    text: 'Go back',
    type: 'button',
    events: {
      click: () => {
        console.log('Navigating back');
      }
    }
  })
});

export default serverErrorPage;
