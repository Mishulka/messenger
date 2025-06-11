import './style.pcss';


const template = `
<div class="chats_container">
    <div class="chats_list">
        <div class="chats_list_link">
            {{{link_profile}}}
            </div>
            {{#each users}}
            {{/each}}

            {{#each chats}}
            <div class="card jc-between ai-center" data-chat-id="{{id}}">
                <div class="chat-avatar-container" id="{{id}}">

                {{#if avatar}}
                    {{#if user.avatarUrl}}
                    <img 
                    src="https://ya-praktikum.tech/api/v2/resources{{user.avatarUrl}}" 
                    alt="Аватар" 
                    id="avatar-img"
                    class="avatar"/>
                    {{/if}}
                    <div class="avatar" id="avatar-img">No Avatar</div>
                    {{else}}
                    <div class="no_avatar"></div>
                {{/if}}
                </div>

                <div class="m-3">
                    {{#if title}}
                    <div class="message_name">{{title}}</div>
                    {{else}}
                    <div class="message_name">No Name</div>
                    {{/if}}

                    {{#if text}}
                    <div class="message_text">{{last_message.content}}</div>
                    {{else}}
                    <div class="message_text"></div>
                    {{/if}}
                </div>
                <div class="chat-unread d-flex jc-center ai-center">{{unread_count}}</div>
            </div>
            {{/each}}

    </div>
    
    <div class="chat">
        <div class="chat_header row">
            <div class="chat-avatar-container">
                {{#if user.avatarUrl}}
                <img 
                src="https://ya-praktikum.tech/api/v2/resources{{user.avatarUrl}}" 
                alt="Аватар" 
                id="avatar-img"
                class="avatar"/>
                {{/if}}
                <div class="avatar" id="avatar-img">No Avatar</div>
            </div>
            {{{btn_add_user}}}
        </div>
        <div class="currentChat"></div>
        <form class="messageForm" id="message-form">
            <div class="messageInput">
               <input
                class="message_input"
                name="message"
                placeholder="Введите сообщение"
                type="text"
                value="{{value}}"
                data-error="{{message}}"
                onblur="handleInputBlur(event)"
                />
            </div>
            {{{send_button}}}
        </form>
    </div>
</div>
`

export default template;
