const menuButton = document.querySelector('.menu-button');
const navLinks = document.querySelector('.nav-links');
const dropdown = document.querySelector('.nav-dropdown');
const dropdownToggle = document.querySelector('.dropdown-toggle');

if (menuButton && navLinks) {
  menuButton.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
  });
}
if (dropdown && dropdownToggle) {
  dropdownToggle.addEventListener('click', () => {
    const open = dropdown.classList.toggle('open');
    dropdownToggle.setAttribute('aria-expanded', String(open));
  });
  document.addEventListener('click', event => {
    if (!dropdown.contains(event.target)) {
      dropdown.classList.remove('open');
      dropdownToggle.setAttribute('aria-expanded', 'false');
    }
  });
}
document.getElementById('year')?.append(new Date().getFullYear());

document.querySelector('[data-contact-form]')?.addEventListener('submit', event => {
  event.preventDefault();
  event.currentTarget.reset();
  event.currentTarget.querySelector('.form-status').style.display = 'block';
});
