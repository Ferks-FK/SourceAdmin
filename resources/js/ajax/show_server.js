const id = location.pathname.split("/")[2] // Get only the server ID.

// Make the ajax request only when needed.
if (location.pathname === `/servers/${id}`) {
  $.getJSON("/servers/" + id).then(server => fillTable(server[0], server[1]))
}

function fillTable(server, player) {
  let tbody = $("#table_server").find("tbody tr")
  let url = location.protocol + '//' + location.host

  tbody.replaceWith(
    `
      <tr class="cursor-pointer bg-[#1a1e22] border-b dark:border-gray-700 hover:bg-lightDark">
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
}
