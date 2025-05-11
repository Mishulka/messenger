import styles from './style.module.pcss';


// export default `
// <button 
//     id="{{id}}" 
//     type="{{type}}" 
//     class="${styles.button}"
//     data-page="{{data-page}}"
// >{{text}}</button>`;

export const template = `
<div class="${styles.button_container}">
<button 
    class="${styles.button} {{classname}}"
    type="{{type}}" 
    data-page="{{data-page}}">
    {{text}}
</button>
</div>
`;

