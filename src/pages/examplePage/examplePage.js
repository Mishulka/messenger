const template = `
<div>
  <h2>Example Page Content 2</h2>
  <p>This is content from the Example Page template.</p>
  <p>Data:</p>
  <ul>
    {{#each users}}
      {{> userPartial userName=userName}}
    {{/each}}
  </ul>
  <p>Current Page</p>
</div>
`;

export { template as ExamplePage };