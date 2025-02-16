import styles from './style.module.pcss';


export default `
<div class="${styles.card} {{#if active}}${styles.card_active}{{/if}}">
    {{#if userAvatar}}
      <img src="{{userAvatar}}" height="50px" width="50px" alt="{{userName}}'s Avatar" />
    {{else}}
      <span>No Avatar</span>
    {{/if}}
    <p>{{userName}}</p>
</div>`;

