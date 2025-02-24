import styles from './style.module.pcss';

const template = `
<div class="${styles.profile_container}">
    <h1>Edit Profile</h1>
    <img src="{{user.userAvatar}}" alt="Фото профиля"/>
    {{> SettingField label-name="Почта" placeholder="ivanivanov@mail.com" name="email"}}
    {{> SettingField label-name="Логин" placeholder="ivan" name="first_name"}}
    {{> SettingField label-name="Имя" placeholder="Иван" name="login"}}
    {{> SettingField label-name="Фамилия" placeholder="Иванов" name="second_name"}}
    {{> SettingField label-name="Имя в чате" placeholder="Ванек" name="display_name"}}
    {{> SettingField label-name="Телефон" placeholder="+7(900)900-90-90" name="phone"}}
<div class="${styles.profile_container}">
    {{> Button text="Сохранить" data-page="Profile"}}
</div>
</div>
`

export { template as EditProfile };
