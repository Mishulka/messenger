import './style.pcss';

export const template = `
<div class="profile-avatar">
   <label class="file-label">
    загрузить аватар
    <input 
    id="avatar-input" 
    type="file" name="avatar" 
    accept="image/*" 
    class="avatar-input-hidden avatar-input file-input"/>
  </label>
</div>
`;
