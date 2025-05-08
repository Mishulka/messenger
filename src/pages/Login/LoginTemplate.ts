import styles from './style.module.pcss';


const template = `
<div class="${styles.login_container}">
  <form class="${styles.login_form}" id="login-form">
    <h2>Вход</h2>
    <div class="${styles.container}">
      {{{field_login}}}
      {{{field_password}}}
    </div>
    <div class="${styles.container}">
      <div class="login-footer">
        {{{button}}} 
        {{{link_register}}}
      </div>
    </div>
    </div>
  </form>
</div>
`

export default template;
