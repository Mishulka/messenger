import styles from './style.module.pcss';


const template = `
<div class="${styles.signin_container}">
  <form class="${styles.signin_form}" id="signin-form">
    <h2>Регистрация</h2>
    <div class="container">
        {{{field_email}}}
        {{{field_login}}}
        {{{field_name}}}
        {{{field_surname}}}
        {{{field_phone}}}
        {{{field_password}}}
        {{{field_password_repeat}}}
    </div>
    <div class="container">
    {{{register_button}}}
    {{{link_login}}}
    <div class="login-footer">
    </div>
    </div>
  </form>
</div>
`

export default template;
