const toggleInput = document.querySelector('.toggle-input');
const body = document.querySelector('body');

toggleInput.addEventListener('change', e => {
  if (e.currentTarget.checked) {
    body.classList.add('light-mode');
  } else {
    body.classList.remove('light-mode');
  }
});
