import './style.pcss';

export const template = `
<div class="button_container">
<button 
    class="button {{classname}}"
    type="{{type}}" 
    data-page="{{data-page}}">
    {{text}}
    {{#if icon}}
        <img src="{{icon}}" />
    {{/if}}
</button>
</div>
`;

