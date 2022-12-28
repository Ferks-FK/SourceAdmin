// Mobile Style Code

const btnMobile = document.getElementById('btn-mobile');
const btnMobileHamburguer = document.getElementById('hamburguer-icon');
const btnMobileItems = document.getElementById('mobile-menu-items');

btnMobile.addEventListener('click', () => {
  btnMobileHamburguer.getAttribute('name') === "menu" ? btnMobileHamburguer.setAttribute('name', 'close') : btnMobileHamburguer.setAttribute('name', 'menu')
  btnMobileItems.classList.toggle('menu-mobile-show')
  btnMobileItems.classList.toggle('menu-mobile-hidden')
});


// Handler Players Table

const players_table = document.getElementById('players_table')
const players_table_items = document.getElementById('players_table_items')

if (players_table) {
  players_table.addEventListener('click', () => {
    players_table_items.classList.toggle('players_table_hidden')
  })
}
