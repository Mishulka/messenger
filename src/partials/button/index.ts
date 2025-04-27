// У кнопки есть index.js, который экспортирует только нужное
import { Button } from "./Component";
import { render } from "../../utils/renderDOM";

const button = new Button({
        className: 'my-class',
        child: 'Click me',
});

// app — это class дива в корне DOM
render(".app", button);

// Через секунду контент изменится сам, достаточно обновить пропсы
setTimeout(() => {
  button.setProps({
    className: 'otherClass',
    child: 'Click me, please',
  });
}, 1000); 