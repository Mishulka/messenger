// src/partials/avatar/avatar.ts
import './style.pcss';

export const template = `
<div class="profile-avatar">
  <label for="avatar-input" class="avatar-upload-label">
    {{#if props.user.avatar}}
      <img 
      src="https://ya-praktikum.tech/api/v2/resources{{props.user.avatar}}" 
      alt="Аватар" 
      class="avatar-image"/>
    {{else}}
      <div class="avatar-placeholder"></div>
    {{/if}}
    <span class="avatar-upload-text">Изменить аватар</span>
  </label>
  <input id="avatar-input" type="file" name="avatar" accept="image/*" class="avatar-input-hidden"/>
</div>
`;