import styles from './style.module.pcss';


export default `
<div class="${styles.div_field}">
    <label class="${styles.label}" for="{{name}}">{{label-name}}</label>
    <input 
        class="${styles.field}" 
        type="{{type}}"
        name="{{name}}"
        placeholder="{{name}}"
        value="{{value}}"
        required>
</div>`;

