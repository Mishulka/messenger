import styles from './style.module.pcss';


const template = `
<div class="${styles.chats_container}">
    <div class="${styles.chats_list}">
        <div class="${styles.chats_list_link}">
            {{> Link text="Профиль" data-page="Profile"}}
        </div>
        {{> SearchInput placeholder="Поиск" }}
        {{#each users}}
            {{> UserCard user=this }} 
        {{/each}}
    </div>
    
    <div class="${styles.chat}">
        <div class="${styles.chat_header}">
            {{#if currentUser.userAvatar}}
                  <img class="${styles.userAvatar}" src="{{currentUser.userAvatar}}" height="50px" width="50px" alt="{{userName}}'s Avatar" />
                {{else}}
                  <img class="${styles.userAvatar}" src="{{noAvatar}}" alt="нет фото" />
                {{/if}}
            <p>{{currentUser.userName}}</p>
        </div>
        <div class="${styles.currentChat}"></div>
        <div class="${styles.messageInput}">
            {{> Input placeholder="Сообщение" }}
        </div>
    </div>
    

</div>
`

export { template as SelectChat };
