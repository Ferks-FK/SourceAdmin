const btnMobile = document.getElementById('btn-mobile');
const btnMobileItems = document.getElementById('mobile-menu-items')

btnMobile.addEventListener('click', toggleMenu);

function toggleMenu() {
  btnMobileItems.classList.toggle('menu-mobile-show')
  btnMobileItems.classList.toggle('menu-mobile-hidden')
}