import './style.pcss';

const template = `
<div class="profile_container">
    <h1>Edit Profile</h1>
    <img src="{{user.userAvatar}}" alt="Фото профиля"/>
    <form>
        <div class="div_field">
          <label class="label" for="email">Почта</label>
          <input class="field"
                 id="email" 
                 name="email" 
                 type="text" 
                 placeholder="ivanivanov@mail.com" 
                 value="{{user.email}}"
                 data-error="{{emailError}}"
                 onblur="handleInputBlur(event)"
          />
          <p id="email-error" class="field_err"></p>
        </div>
        <div class="div_field">
          <label class="label" for="first_name">Логин</label>
          <input class="field"
                 id="first_name" 
                 name="first_name" 
                 type="text" 
                 placeholder="ivan" 
                 value="{{user.first_name}}"
                 data-error="{{first_nameError}}"
                 onblur="handleInputBlur(event)"
          />
          <p id="first_name-error" class="field_err"></p>
        </div>
        <div class="div_field">
          <label class="label" for="login">Имя</label>
          <input class="field"
                 id="login" 
                 name="login" 
                 type="text" 
                 placeholder="Иван" 
                 value="{{user.login}}"
                 data-error="{{loginError}}"
                 onblur="handleInputBlur(event)"
          />
          <p id="login-error" class="field_err"></p>
        </div>
        <div class="div_field">
          <label class="label" for="second_name">Фамилия</label>
          <input class="field"
                 id="second_name" 
                 name="second_name" 
                 type="text" 
                 placeholder="Иванов" 
                 value="{{user.second_name}}"
                 data-error="{{second_nameError}}"
                 onblur="handleInputBlur(event)"
          />
          <p id="second_name-error" class="field_err"></p>
        </div>
        <div class="div_field">
          <label class="label" for="display_name">Имя в чате</label>
          <input class="field"
                 id="display_name" 
                 name="display_name" 
                 type="text" 
                 placeholder="Ванек" 
                 value="{{user.display_name}}"
                 data-error="{{display_nameError}}"
                 onblur="handleInputBlur(event)"
          />
          <p id="display_name-error" class="field_err"></p>
        </div>
        <div class="div_field">
          <label class="label" for="phone">Телефон</label>
          <input class="field"
                 id="phone" 
                 name="phone" 
                 type="text" 
                 placeholder="+79999999999" 
                 value="{{user.phone}}"
                 data-error="{{phoneError}}"
                 onblur="handleInputBlur(event)"
          />
          <p id="phone-error" class="field_err"></p>
        </div>
        {{{button_save}}}
        {{{link_back}}}
    </form>
</div>
`

export default template;
