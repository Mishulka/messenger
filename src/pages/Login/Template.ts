import './style.pcss';


const template = `
<div class="login_container">
  <form class="login_form" id="login-form">
    <h2>Вход</h2>

    <div class="container">
    <div class="div_field">
     <label class="label" for="login">Логин</label>
      <input class="field"
      id="login" 
      name="login" 
      type="text" 
      placeholder="Enter your login" 
      value="{{value}}"
      data-error="{{error}}"
      onblur="handleInputBlur(event)" />
    <p id="login-error" class="field_err"></p>
    </div>
   
   <div class="div_field">
    <label class="label" for="login">Пароль</label>
    <input class="field"
    id="password"
    name="password"
    type="password"
    placeholder="Enter your password"
    value="{{value}}"
    data-error="{{error}}"
    onblur="handleInputBlur(event)" />
    <p id="password-error" class="field_err"></p>
    </div>
    </div>

    <div class="container">
      <div class="login-footer">
        {{{login_button}}} 
        {{{link_register}}}
      </div>
    </div>
    </div>
  </form>
</div>
`

export default template;
