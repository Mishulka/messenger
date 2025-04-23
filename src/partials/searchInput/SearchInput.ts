import styles from './style.module.pcss';


export default `<div class="${styles.searchContainer}">
  <input 
    type="search" 
    id="{{inputId}}" 
    class="${styles.input}"
    placeholder="{{placeholder}}">
</div>`;
