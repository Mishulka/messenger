import App from './app.js'
import './main_styles/style.pcss';
import { Http} from './core/Http.js';

(globalThis as any).Http = Http;

new Http().get('https://reqres.in/api/users?page=2')
    .then((xhr) => {
        console.log('Res:', xhr.responseText);
    })





document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.render();
})
