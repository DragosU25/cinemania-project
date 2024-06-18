const toggleInput = document.querySelector('.toggle-input');
const lightModeClass = document.querySelectorAll('.light-mode');

console.log(lightModeClass);
lightModeClass.forEach(element => {
  element.classList.remove('light-mode');
});
toggleInput.addEventListener('change', e => {
  if (e.currentTarget.checked) {
    lightModeClass.forEach(item => {
      item.classList.add('light-mode');
    });
  } else {
    lightModeClass.forEach(item => {
      item.classList.remove('light-mode');
    });
  }
});
