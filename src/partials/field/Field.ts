import styles from './style.module.pcss';

export const template = `
<div class="${styles.div_field}">
    <label class="${styles.label}" for="{{name}}">{{label_name}}</label>
    <input 
        class="${styles.field} {{#if error}}${styles.input_err}{{/if}}" 
        type="{{type}}"
        name="{{name}}"
        placeholder="{{placeholder}}"
        value="{{value}}"
        required
        {{#if events.focusout}}onfocusout="{{focusoutHandler}}"{{/if}} />
</div>
<p class="${styles.field_err}">{{#if error}}{{error}}{{/if}}</p>
`;