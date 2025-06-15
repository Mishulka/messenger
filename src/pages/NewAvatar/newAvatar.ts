import template from './Template';
import Block from '../../core/Block/block';



class NewAvatar extends Block {
  constructor() {
    super('div');
  }

  render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}



export const newAvatarPage = new NewAvatar()

