import styles from './style.module.pcss';

export const template = `
<div class="${styles.div_field}">
    <label class="${styles.label}" for="{{name}}">{{label_name}}</label>
    <input 
        class="${styles.field}" 
        type="{{type}}"
        name="{{name}}"
        placeholder="{{placeholder}}"
        value="{{value}}"
        required
        {{#if events.blur}}onblur="{{blurHandler}}"{{/if}}
</div>
{{#each error}}<p class="${styles.field_err}">{{error}}</p>{{/each}}
`;

