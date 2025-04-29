// У кнопки есть index.ts, который экспортирует только нужное
import { ButtonBlock } from "./Component";
import { render } from "../../utils/renderDOM";

const Button = new ButtonBlock({
        classname: 'my-class',
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
}, 1000); 
setTimeout(() => {
  console.log("Button props after setProps");
  console.log(Button.props.text);
}, 2000);
export const buttonHTML = Button.render();