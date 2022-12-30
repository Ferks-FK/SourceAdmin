$(async function() {
  if (location.pathname === "/servers") {
    await $.getJSON('/servers').then(data => createTable({data}))

    let table = $('#table_servers')
    let tbody = table.find('tbody tr')

    if (tbody.attr('data-href') !== undefined) {
      tbody.on('click', function() {
        window.location.href = $(this).data('href')
      })
    }
  }
})

function createTable({data}) {
  let table = $("#table_servers")
  let tbody = table.find("tbody")
  let url = location.protocol + '//' + location.host
  let row = ''

  for (let i = 0; i < data.length; i++) {
    let is_online = data[i].Is_online
    row +=
    `
      <tr ${is_online ? `data-href="/servers/${data[i].Id}"` : ""} class="${is_online ? "cursor-pointer" : "cursor-not-allowed"} bg-[#1a1e22] border-b dark:border-gray-700 hover:bg-lightDark">
        ${is_online ?
          `
            <th class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              <img src="${url}/images/games/${data[i].ModDir}.png" class="w-5">
            </th>
            <td class="py-3 px-6">
              <img src="${url}/images/${data[i].Os}.png" class="w-5 mr-1">
            </td>
            <td class="py-3 px-6">
              <img src="${url}/images/${data[i].Secure ? "shield" : "smac"}.png" class="w-5">
            </td>
            <td class="py-3 px-6">${data[i].HostName}</td>
            <td class="py-3 px-6">${data[i].Players}/${data[i].MaxPlayers}</td>
            <td class="py-3 px-6">${data[i].Map}</td>
          `
          :
          `
            <td class="py-3 px-6">N/A</td>
            <td class="py-3 px-6">N/A</td>
            <td class="py-3 px-6">N/A</td>
            <td class="py-3 px-6">${data[i]}</td>
            <td class="py-3 px-6">N/A</td>
            <td class="py-3 px-6">N/A</td>
          `
        }
      </tr>
    `
  }

  tbody.html(row)
}
