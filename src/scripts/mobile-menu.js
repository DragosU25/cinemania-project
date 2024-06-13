const menuBtn = document.querySelector('.menu-button');
const menuOverlay = document.querySelector('.menu-overlay');
const menuContainer = document.querySelector('.menu-container');

// Function to toggle the menu visibility
const toggleMenu = () => {
  menuOverlay.classList.toggle('is-hidden');
  menuBtn.style.display = menuOverlay.classList.contains('is-hidden')
    ? 'block'
    : 'none';
};

// Event listener for the menu button
menuBtn.addEventListener('click', e => {
  e.stopPropagation(); // Prevent the click event from bubbling up to the window
  toggleMenu();
});

// Event listener for the window to close the menu when clicking outside
window.addEventListener('click', e => {
  if (
    !menuOverlay.classList.contains('is-hidden') &&
    !menuContainer.contains(e.target) &&
    !menuBtn.contains(e.target)
  ) {
    toggleMenu();
  }
});

// Event listener for the window to close the menu when resizing above 768px
window.addEventListener('resize', () => {
  if (
    window.innerWidth >= 768 &&
    !menuOverlay.classList.contains('is-hidden')
  ) {
    toggleMenu();
  }
});
