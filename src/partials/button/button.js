import styles from './style.module.pcss';


export default `
<button 
    id="{{id}}" 
    type={{type}} 
    onclick="{{Event}}" 
    class="${styles.button}"
>{{text}}</button>`;

