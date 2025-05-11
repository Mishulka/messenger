import './style.module.pcss';


export default `
<div class="card">
    {{#if userAvatar}}
      <img 
        class="userAvatar" 
        src="{{userAvatar}}" 
        height="50px" 
        width="50px" 
        alt="{{userName}}'s Avatar" 
        />
    {{else}}
      <img class="userAvatar" src="{{noAvatar}}" alt="нет фото" />
    {{/if}}
    <p>{{userName}}</p>
</div>`;

