import styles from './style.module.pcss';


const template = `
<div class="${styles.signin_container}">
  <form class="${styles.signin_form}" id="signin-form">
    <h2>Регистрация</h2>
    <div class="${styles.container}">
    {{> Field text="Почта" label-name="Mail"}}
    {{> Field text="Login" label-name="Login" name="login"}}
    {{> Field text="Имя" label-name="Name" name="first_name"}}
    {{> Field text="Фамилия" label-name="Surname" name="second_name"}}
    {{> Field text="Телефон" label-name="Phone" name="phone"}}
    {{> Field text="Пароль" label-name="Password" type="password" name="password"}}
    {{> Field text="" label-name="Пароль (ещё раз)" type="re-password"}}
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
