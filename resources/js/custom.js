// Mobile Style Code

const btnMobile = document.getElementById('btn-mobile');
const btnMobileHamburguer = document.getElementById('hamburguer-icon');
const btnMobileItems = document.getElementById('mobile-menu-items');

btnMobile.addEventListener('click', () => {
  btnMobileHamburguer.getAttribute('name') === "menu" ? btnMobileHamburguer.setAttribute('name', 'close') : btnMobileHamburguer.setAttribute('name', 'menu')
  btnMobileItems.classList.toggle('menu-mobile-show')
  btnMobileItems.classList.toggle('menu-mobile-hidden')
});


// HTML Table Link Code

const rows = document.querySelectorAll('tr[data-href]');

rows.forEach(row => {
  row.addEventListener('click', () => {
    window.location.href = row.dataset.href;
  });
});

// Handler Players Table

const players_table = document.getElementById('players_table')
const players_table_items = document.getElementById('players_table_items')

players_table.addEventListener('click', () => {
  players_table_items.classList.toggle('players_table_hidden')
})

const action_kick_player = document.getElementById('action_kick_player');

action_kick_player.addEventListener('click', function(e) {
  const player_name = e.target.closest('tr')

  console.log(player_name)
  // const modal = document.getElementById('action-' + e.path[0].innerText.toLowerCase())
  // const player_name = e.path[4].childNodes[1].childNodes[3].childNodes[1].childNodes[1].innerText

  // console.log(player_name)

  // console.log(e)

  // modal.classList.toggle('hidden')
})
