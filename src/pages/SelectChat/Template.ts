import styles from './style.module.pcss';


const template = `
<div class="${styles.chats_container}">
    <div class="${styles.chats_list}">
        <div class="${styles.chats_list_link}">
            {{{link_profile}}}
        </div>
        {{#each users}}
        {{/each}}
    </div>
    
    <div class="${styles.chat}">
        <div class="${styles.chat_header}">
        </div>
        <div class="${styles.currentChat}"></div>
        <form>
            <div class="${styles.messageInput}">
               {{{field_message}}}
            </div>
        </form>
        
    </div>
    

</div>
`

export default template;
