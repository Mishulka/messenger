import App from './app.js'
import { Http } from './core/Http';



if (typeof window !== 'undefined') {
  (window as any).Http = Http;
} else if (typeof global !== 'undefined') {
  (global as any).Http = Http;
}


document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.render();
})
