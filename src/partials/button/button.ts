import './style.module.pcss';

export const template = `
<div class="button_container">
<button 
    class="button {{classname}}"
    type="{{type}}" 
    data-page="{{data-page}}">
    {{text}}
</button>
</div>
`;

