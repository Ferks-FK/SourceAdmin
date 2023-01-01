$(async function() {
  // Make the ajax request only when needed.
  if (location.pathname === "/" || location.pathname === "/servers") {
    const data = await $.getJSON('/servers')

    // Connect to each server individually and build the result in the table.
    data.forEach((id, index) => {
      $.getJSON('/servers/ajax/' + id).then(server => fillTable(server, index, data))
      .catch((server) => {
        fillTable(server.responseText, index, data)
      })
    });
  }
})

function fillTable(server, index, data) {
  let tbody = $("#table_servers").find(`tbody tr:nth-child(${index + 1})`)
  let url = location.protocol + '//' + location.host
  let is_online = server.Is_online
  let row =
  `
    <tr ${is_online ? `data-href="/servers/${server.Id}"` : ""} class="${is_online ? "cursor-pointer" : "cursor-not-allowed"} bg-[#1a1e22] border-b dark:border-gray-700 hover:bg-lightDark">
      ${is_online ?
        `
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
        `
        :
        `
          <td class="py-3 px-6">N/A</td>
          <td class="py-3 px-6">N/A</td>
          <td class="py-3 px-6">N/A</td>
          <td class="py-3 px-6">${server}</td>
          <td class="py-3 px-6">N/A</td>
          <td class="py-3 px-6">N/A</td>
        `
      }
    </tr>
  `
  tbody.replaceWith(row)
  showServer(index, data)

}

function showServer(index, data) {
  let table = $("#table_servers")
  let href_attribute = table.find(`tbody tr:nth-child(${index + 1})`).attr('data-href')

  // Do not allow access to a specific server if it is offline, or if it is currently being queried.
  if (href_attribute !== undefined && index + 1 < data.length) {
    table.find("tbody tr").on('click', function() {
      if ($("#loading").length === 0) {
        window.location.href = $(this).data('href')
      }
    })
  }
}
