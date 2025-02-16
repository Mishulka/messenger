import styles from './style.module.pcss';


const template = `
<div class="${styles.signin_container}">
    {{> Link text="Профиль" data-page="Profile"}}
    {{#each users}}
        {{> UserCard user=this }} 
    {{/each}}
    <h1>SelectChat</h1>

</div>
`

export { template as SelectChat };
