import styles from './style.module.pcss';


const template = `
<div class="${styles.signin_container}">
  <form class="${styles.signin_form}" id="signin-form">
    <h2>Регистрация</h2>
    <div class="container">

        <div class="div_field">
  <label class="label" for="email">Email</label>
  <input class="field"
         id="email" 
         name="email" 
         type="text" 
         placeholder="Enter your email" 
         value="{{emailValue}}"
         data-error="{{emailError}}"
         onblur="handleInputBlur(event)" />
  <p id="email-error" class="field_err"></p>
</div>

<div class="div_field">
  <label class="label" for="login">Логин</label>
  <input class="field"
         id="login" 
         name="login" 
         type="text" 
         placeholder="Enter your login" 
         value="{{loginValue}}"
         data-error="{{loginError}}"
         onblur="handleInputBlur(event)" />
  <p id="login-error" class="field_err"></p>
</div>

<div class="div_field">
  <label class="label" for="first_name">Имя</label>
  <input class="field"
         id="first_name" 
         name="first_name" 
         type="text" 
         placeholder="Enter your first name" 
         value="{{first_nameValue}}"
         data-error="{{first_nameError}}"
         onblur="handleInputBlur(event)" />
  <p id="first_name-error" class="field_err"></p>
</div>

<div class="div_field">
  <label class="label" for="second_name">Фамилия</label>
  <input class="field"
         id="second_name" 
         name="second_name" 
         type="text" 
         placeholder="Enter your surname" 
         value="{{second_nameValue}}"
         data-error="{{second_nameError}}"
         onblur="handleInputBlur(event)" />
  <p id="second_name-error" class="field_err"></p>
</div>

<div class="div_field">
  <label class="label" for="phone">Телефон</label>
  <input class="field"
         id="phone" 
         name="phone" 
         type="text" 
         placeholder="Enter your phone" 
         value="{{phoneValue}}"
         data-error="{{phoneError}}"
         onblur="handleInputBlur(event)" />
  <p id="phone-error" class="field_err"></p>
</div>

<div class="div_field">
  <label class="label" for="password">Пароль</label>
  <input class="field"
         id="password" 
         name="password" 
         type="password" 
         placeholder="Enter your password" 
         value="{{passwordValue}}"
         data-error="{{passwordError}}"
         onblur="handleInputBlur(event)" />
  <p id="password-error" class="field_err"></p>
</div>

<div class="div_field">
  <label class="label" for="password_repeat">Повтор пароля</label>
  <input class="field"
         id="password_repeat" 
         name="password_repeat" 
         type="password" 
         placeholder="Confirm your password" 
         value="{{password_repeatValue}}"
         data-error="{{password_repeatError}}"
         onblur="handleInputBlur(event)" />
  <p id="password_repeat-error" class="field_err"></p>
</div>
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
