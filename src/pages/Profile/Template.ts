import './style.pcss';

const template = `
<div class="profile_container">
    <h1>Your Profile</h1>
    <img src="{{user.userAvatar}}" alt="Фото профиля"/>

    <div class="div_field">
    <label class="label" for="email">Почта</label>
    <input class="field"
            id="email" 
            name="email" 
            type="text" 
            placeholder="ivanivanov@mail.com" />
    </div>

    <div class="div_field">
    <label class="label" for="login">Логин</label>
    <input class="field"
            id="login" 
            name="login" 
            type="text" 
            placeholder="ivan" />
    </div>

    <div class="div_field">
    <label class="label" for="first_name">Имя</label>
    <input class="field"
            id="first_name" 
            name="first_name" 
            type="text" 
            placeholder="Иван" />
    </div>

    <div class="div_field">
    <label class="label" for="second_name">Фамилия</label>
    <input class="field"
            id="second_name" 
            name="second_name" 
            type="text" 
            placeholder="Иванов" />
    </div>

    <div class="div_field">
    <label class="label" for="chat_name">Имя в чате</label>
    <input class="field"
            id="chat_name" 
            name="chat_name" 
            type="text" 
            placeholder="Ванек" />
    </div>

    <div class="div_field">
    <label class="label" for="phone">Телефон</label>
    <input class="field"
            id="phone" 
            name="phone" 
            type="text" 
            placeholder="+7(900)900-90-90" />
    </div>
<div class="profile_container">
    {{{link_edit_profile}}}
    {{{link_edit_password}}}
    {{{link_logout}}}
</div>
</div>
`
export default template;
