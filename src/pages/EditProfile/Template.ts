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
          />
          <p id="display_name-error" class="field_err"></p>
        </div>
        <div class="div_field">
          <label class="label" for="phone">Телефон</label>
          <input class="field"
                 id="phone" 
                 name="phone" 
                 type="text" 
                 placeholder="+7(900)900-90-90" 
                 value="{{user.phone}}"
          />
          <p id="phone-error" class="field_err"></p>
        </div>
        <div class="profile_container">
            {{{button_save}}}
        </div>
    </form>
</div>
`

export default template;
