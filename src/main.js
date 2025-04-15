import App from './app.ts'
import './main_styles/style.pcss';

document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.render();
})
