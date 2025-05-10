import Validate from './validate';

export function handleInputBlur(event: FocusEvent): void {
  const inputEl = event.target as HTMLInputElement;
  const fieldName = inputEl.name; 
  const value = inputEl.value;
  const error = Validate(value, fieldName);
  
 
  const errorEl = document.getElementById(`${fieldName}-error`);
  if (errorEl) {
    errorEl.textContent = error || "";
  }
  
  if (error) {
    inputEl.classList.add('input_err');
  } else {
    inputEl.classList.remove('input_err');
  }
}