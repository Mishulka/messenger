import Block from '../../core/block';
import template from './Template';
import Button from '../../partials/button/index';

interface INotFoundProps {
  backButton: Button;
  [key: string]: unknown;
}

class NotFound extends Block {
  constructor(props: INotFoundProps) {
    super('div', props);
  }

  render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export const notFoundPage = new NotFound({
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

export default notFoundPage;
