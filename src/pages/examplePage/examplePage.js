const template = `
<div>
  <h2>Example Page</h2>
  <p>This is Page with all components.</p>
  <p>Components:</p>
  {{> Button text="Just Button"}}
  {{> Dropdown}}
  {{> Field}}
  {{> Input}}
  {{> SearchInput placeholder="Search"}}
  {{> SettingField}}
</div>
`;

export { template as AllComponentsPage };