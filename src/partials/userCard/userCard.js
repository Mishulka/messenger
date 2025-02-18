import styles from './style.module.pcss';


export default `
<div class="${styles.card}">
    {{#if userAvatar}}
      <img class="${styles.userAvatar}" src="{{userAvatar}}" height="50px" width="50px" alt="{{userName}}'s Avatar" />
    {{else}}
      <img class="${styles.userAvatar}" src="{{noAvatar}}" alt="нет фото" />
    {{/if}}
    <p>{{userName}}</p>
</div>`;

