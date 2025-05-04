import App from './app.js'
import './main_styles/style.pcss';
import { Http} from './core/Http.js';

(globalThis as any).Http = Http;


document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.render();
})
