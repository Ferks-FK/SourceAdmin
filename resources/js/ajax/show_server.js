const id = location.pathname.split("/")[2] // Get only the server ID.

// Make the ajax request only when needed.
if (location.pathname === `/servers/${id}`) {
  $.getJSON("/servers/" + id).then(server => fillTableServer(server[0], server[1]))
}

function fillTableServer(server, players) {
  let tbody = $("#table_server").find("tbody tr")
  let url = location.protocol + '//' + location.host

  tbody.replaceWith(
    `
      <tr class="cursor-pointer bg-[#1a1e22] border-b dark:border-gray-700 hover:bg-lightDark" id="table_server_row">
        <th class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          <img src="${url}/images/games/${server.ModDir}.png" class="w-5">
        </th>
        <td class="py-3 px-6">
          <img src="${url}/images/${server.Os}.png" class="w-5 mr-1">
        </td>
        <td class="py-3 px-6">
          <img src="${url}/images/${server.Secure ? "shield" : "smac"}.png" class="w-5">
        </td>
        <td class="py-3 px-6">${server.HostName}</td>
        <td class="py-3 px-6">${server.Players}/${server.MaxPlayers}</td>
        <td class="py-3 px-6">${server.Map}</td>
      </tr>
    `
  )

  fillTablePlayers(server, players)

  // Toggle the table child.
  $("#table_server_row").on('click', function() {
    players.length === 0 ?
      $("#players_table_items").next().fadeToggle("fast")
    :
      $("#table_players").children().fadeToggle("fast")
  })
}

function fillTablePlayers(server, players) {
  let tbody = $("#table_players").find("tbody")
  let table_players_items = $("#players_table_items")
  let row = ''

  players.length === 0 ? (table_players_items.hide(), table_players_items.after(
    `
      <div class="bg-[#1a1e22] border-b dark:border-gray-700 p-5 text-center text-gray-400">
        <p class="text-lg">No players in the server.</p>
        <div class="flex flex-col">
          <p>${server.Ip}:${server.GamePort}</p>
          <div class="flex justify-center mt-2">
            <a href="steam://connect/${server.Ip}:${server.GamePort}" class="button-success">
            <ion-icon name="log-in" class="w-5 h-5"></ion-icon>
              Connect
            </a>
          </div>
        </div>
      </div>
    `
  ))
  :
  players.forEach(player => {
    row +=
    `
      <tr class="cursor-pointer bg-[#1a1e22] border-b dark:border-gray-700 hover:bg-lightDark">
        <td class="py-3 px-6">${player.Name}</td>
        <td class="py-3 px-6">${player.Frags}</td>
        <td class="py-3 px-6">${player.TimeF}</td>
        <td class="py-3 px-6">Ai</td>
      </tr>
    `
  });

  tbody.html(row)
}
