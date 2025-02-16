import styles from './style.module.pcss';

const template = `
<div class="${styles.container}">
  <h2>Example Page</h2>
  <p>This is Page with all components.</p>
  <p>Components:</p>
  {{> Button text="Just Button"}}
  {{> Field}}
  {{> Input}}
  {{#each users}}
    {{> UserCard user=this }} 
  {{/each}}
</div>
`;

export { template as AllBlocks };
