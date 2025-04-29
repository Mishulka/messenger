// У кнопки есть index.js, который экспортирует только нужное
import { ButtonBlock } from "./Component";
import { render } from "../../utils/renderDOM";

const Button = new ButtonBlock({
        className: 'my-class',
        text: 'Click me',
});

console.log(Button.props.text)
document.addEventListener("DOMContentLoaded", () => {
  render("#app", Button);
});


setTimeout(() => {
  Button.setProps({
    className: 'otherClass',
    text: 'Click me, please',
  });
}, 3000); 
setTimeout(() => {
  console.log(Button.props.text);
}, 4000);
export const buttonHTML = Button.render();