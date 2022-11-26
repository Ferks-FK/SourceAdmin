// Mobile Style Code

const btnMobile = document.getElementById('btn-mobile');
const btnMobileItems = document.getElementById('mobile-menu-items')

btnMobile.addEventListener('click', () => {
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
