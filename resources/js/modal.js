/*
This shitty code will probably break somewhere, and it should also be possible to improve it.
If you know more JS than I do, please make it better xD
*/

const modal = document.getElementsByClassName("modal");
const modal_item = modal.item(0);

modal_item.addEventListener('click', function(e) {
  if (e.target == this) {
    close_modal()
  }
})

function open_modal(action, player_name) {
  const modal_action = document.getElementsByClassName('modal_action')
  const modal_player = document.getElementById('modal_player')

  for (let item of modal_action) {
    item.innerText = action;
  }

  modal_player.innerText = player_name;
  modal_item.classList.remove('opacity-0', 'z-[-1]')
  modal_item.classList.add('z-50')
}

function close_modal() {
  modal_item.classList.add('opacity-0', 'z-[-1]')
  modal_item.classList.remove('z-50')
}

function modal_action(action, player_name) {
  open_modal(action, player_name)
}

globalThis.close_modal = close_modal
globalThis.modal_action = modal_action


