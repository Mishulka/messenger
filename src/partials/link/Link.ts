import './styles.pcss';




export const template = `
<a 
    class="link_to_page {{#if exit}}exit{{/if}}" 
    href="{{href}}"
    onClick="{{Event}}"
>{{text}}</a>`;

