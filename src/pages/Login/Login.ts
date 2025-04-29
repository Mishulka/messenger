import styles from './style.module.pcss';


const template = `
<div class="${styles.login_container}">
  <form class="${styles.login_form}" id="login-form">
    <h2>Вход</h2>
    {{{button}}}
    <div class="${styles.container}">
    {{> Field text="Login" label-name="Login" name="login"}}
    {{> Field text="Password" label-name="Password" type="password" name="password"}}
    </div>
    <div class="${styles.container}">
    {{> Button text="Login" type="button" data-page="SelectChat"}}
    <div class="login-footer">
    </div>
      {{> Link text="Нет аккаунта?" data-page="Signin"}}
    </div>
  </form>
</div>
`

export { template as Login };
