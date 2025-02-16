import styles from './style.module.pcss';


export default `
<button 
    id="{{id}}" 
    type="{{type}}" 
    class="${styles.button}"
    data-page="{{data-page}}"
>{{text}}</button>`;

