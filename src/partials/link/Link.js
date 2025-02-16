import styles from './styles.module.pcss';



export default `
<a 
    class="${styles.a} ${styles.link_to_page}" 
    href="{{href}}"
    onClick="{{Event}}"
    data-page="{{data-page}}"
>{{text}}</a>`;

