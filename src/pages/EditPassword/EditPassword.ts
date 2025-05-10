import styles from './style.module.pcss';

const template = `
<div class="${styles.profile_container}">
    <h1>Edit Profile</h1>
    <img src="{{user.userAvatar}}" alt="Фото профиля"/>
    {{> SettingField 
    label-name="Старый пароль" 
    placeholder="_" name="old_password" 
    type="password"}}

    {{> SettingField label-name="Новый пароль" placeholder="_" name="new_password" type="password"}}

    {{> SettingField 
    label-name="Повторите новый пароль" 
    placeholder="_" 
    name="new_password" 
    type="password"}}
    
<div class="${styles.profile_container}">
    {{> Button text="Сохранить" data-page="Profile"}}
</div>
</div>
`

export { template as EditPassword };
