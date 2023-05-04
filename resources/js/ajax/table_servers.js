// Make the ajax request only when needed.
if (location.pathname === "/" || location.pathname === "/servers") {
  $(async function() {
    const data = await $.getJSON('/servers')

    // Connect to each server individually and build the result in the table.
    data.forEach(function(id, index) {
      $.getJSON('/servers/' + id).then(server => fillTable(server[0], index, data))
      .catch(server => {
        fillTable(server.responseText, index, data)
      })
    });
  })
}

function fillTable(server, index, data) {
  let tbody = $("#table_servers").find(`tbody tr:nth-child(${index + 1})`)
  let url = location.protocol + '//' + location.host

  tbody.replaceWith(
    server.Is_online ?
    `
    <tr data-href="/servers/${server.Id}" class="cursor-pointer bg-[#1a1e22] border-b dark:border-gray-700 hover:bg-lightDark">
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
    :
    `
    <tr class="cursor-not-allowed bg-[#1a1e22] border-b dark:border-gray-700 hover:bg-lightDark">
      <td class="py-3 px-6">N/A</td>
      <td class="py-3 px-6">N/A</td>
      <td class="py-3 px-6">N/A</td>
      <td class="py-3 px-6">${server}</td>
      <td class="py-3 px-6">N/A</td>
      <td class="py-3 px-6">N/A</td>
    </tr>
    `
  )
  redirectToServer(index, data)
}

function redirectToServer(index, data) {
  let table = $("#table_servers")
  let href_attribute = table.find(`tbody tr:nth-child(${index + 1})`).attr('data-href')

  // Do not allow access to a specific server if it is offline, or if it is currently being queried.
  if (href_attribute !== undefined && index + 1 <= data.length) {
    table.find("tbody tr").on('click', function() {
      if ($("#loading").length === 0) {
        window.location.href = $(this).data('href')
      }
    })
  }
}
