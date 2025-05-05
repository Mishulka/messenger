import styles from './style.module.pcss';


const template = `
<div class="${styles.login_container}">
  <form class="${styles.login_form}" id="login-form">
    <h2>Вход</h2>
    <div class="${styles.container}">
    
    </div>
    <div class="${styles.container}"></div>
      <div class="login-footer">
        {{{button}}}
        
      </div>
    </div>
  </form>
</div>
`

export default template;
