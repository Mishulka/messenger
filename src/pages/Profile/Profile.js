import styles from './style.module.pcss';

const template = `
<div class="${styles.profile_container}">
    <h1>Your Profile</h1>
    <img src="{{user.userAvatar}}" alt="Фото профиля"/>
    {{> SettingField label-name="Почта" placeholder="ivanivanov@mail.com"}}
    {{> SettingField label-name="Логин" placeholder="ivan"}}
    {{> SettingField label-name="Имя" placeholder="Иван"}}
    {{> SettingField label-name="Фамилия" placeholder="Иванов"}}
    {{> SettingField label-name="Имя в чате" placeholder="Ванек"}}
    {{> SettingField label-name="Телефон" placeholder="+7(900)900-90-90"}}
<div class="${styles.profile_container}">
    {{> Link text="Изменить данные" data-page="EditProfile"}}
    {{> Link text="Изменить Пароль"}}
    {{> Link text="Выйти" data-page="SelectChat" exit=true}}
</div>
</div>
`

export { template as Profile };
