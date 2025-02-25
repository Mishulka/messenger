import styles from './styles.module.pcss';



export default `
<a 
    class="${styles.a} ${styles.link_to_page} {{#if exit}}${styles.exit}{{/if}}" 
    href="{{href}}"
    onClick="{{Event}}"
    data-page="{{data-page}}"
>{{text}}</a>`;

