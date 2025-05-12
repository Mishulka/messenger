import './style.pcss';


const template = `
<div class="chats_container">
    <div class="chats_list">
        <div class="chats_list_link">
            {{{link_profile}}}
        </div>
        {{#each users}}
        {{/each}}
    </div>
    
    <div class="chat">
        <div class="chat_header">
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
