import styles from './style.module.pcss';


export default `
<div class="${styles.div_field}">
    <p class="
        ${styles.label} 
        {{#if change}}${styles.change}
        {{/if}}" for="{{name}}"
        >{{label-name}}
    </p>
    <input 
        class="${styles.field}" 
        type="{{type}}"
        name="{{name}}"
        placeholder="{{placeholder}}"
        value="{{value}}"
        required>
</div>`;

