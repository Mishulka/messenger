import './style.pcss';

const template = `
<div class="profile_container">
    <h1>Your Profile</h1>

    <div class="profile-container">
  <div class="profile-avatar">
    {{#if user.avatar}}
      <img src="{{user.avatar}}" alt="Аватар" class="avatar-img" />
    {{else}}
      <div class="avatar">No Avatar</div>
    {{/if}}
    <div>{{user.display_name}}</div>
  </div>

  <div class="profile-field">
    <span class="field-label">Почта</span>
    <span class="field-value">{{user.email}}</span>
  </div>

  <div class="profile-field">
    <span class="field-label">Логин</span>
    <span class="field-value">{{user.login}}</span>
  </div>

  <div class="profile-field">
    <span class="field-label">Имя</span>
    <span class="field-value">{{user.first_name}}</span>
  </div>

  <div class="profile-field">
    <span class="field-label">Фамилия</span>
    <span class="field-value">{{user.second_name}}</span>
  </div>

  <div class="profile-field">
        <span class="field-label">Имя в чате</span>
        <span class="field-value">{{user.display_name}}</span>
  </div>

    <div class="profile-field">
        <span class="field-label">Телефон</span>
        <span class="field-value">{{user.phone}}</span>
    </div>

    {{{btn_edit_data}}}
    </div>
<div class="profile_container">
    {{{link_edit_profile}}}
    {{{link_edit_password}}}
    {{{link_logout}}}
</div>
</div>
`
export default template;
