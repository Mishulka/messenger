import styles from './style.module.pcss';

const template = `
<div class="${styles.profile_container}">
    <h1>Edit Password</h1>
    <form>
        <div class="div_field">
          <label class="label" for="old_password">Старый пароль</label>
          <input class="field"
                 id="old_password" 
                 name="old_password" 
                 type="password" 
                 placeholder="Введите старый пароль" 
                 value="{{oldPasswordValue}}"
                 data-error="{{oldPasswordError}}"
                 onblur="handleInputBlur(event)" 
          />
          <p id="old_password-error" class="field_err"></p>
        </div>
        <div class="div_field">
          <label class="label" for="new_password">Новый пароль</label>
          <input class="field"
                 id="new_password" 
                 name="new_password" 
                 type="password" 
                 placeholder="Введите новый пароль" 
                 value="{{newPasswordValue}}"
                 data-error="{{newPasswordError}}"
                 onblur="handleInputBlur(event)" 
          />
          <p id="new_password-error" class="field_err"></p>
        </div>
        <div class="div_field">
          <label class="label" for="repeat_password">Повторите новый пароль</label>
          <input class="field"
                 id="repeat_password" 
                 name="repeat_password" 
                 type="password" 
                 placeholder="Повторите новый пароль" 
                 value="{{repeatPasswordValue}}"
                 data-error="{{repeatPasswordError}}"
                 onblur="handleInputBlur(event)" 
          />
          <p id="repeat_password-error" class="field_err"></p>
        </div>
        <div class="${styles.profile_container}">
            {{{button_save}}}
        </div>
    </form>
</div>
`

export default template;
