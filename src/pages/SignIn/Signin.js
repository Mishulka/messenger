import styles from './style.module.pcss';


const template = `
<div class="${styles.login_container}">
  <form class="${styles.login_form}" id="login-form">
    <h2>Регистрация</h2>
    <div class="${styles.container}">
    {{> Field text="Login" label-name="Login"}}
    {{> Field text="Password" label-name="Password" type="password"}}
    </div>
    <div class="${styles.container}">
    {{> Button text="Login"}}
    <div class="login-footer">
    </div>
      {{> Link text="Зарегистрировались?" data-page="Login"}}
    </div>
  </form>
</div>
`

export { template as Signin };
